import { DatoNavigationProps, DatoNavigationResponseType } from "../types/dato";
export type NavTreeNode = {
  slug: string;
  title: string;
  position: string;
  path: string;
  depth: number;
  children: NavTreeNode[];
  parentPath?: string;
};

export function buildNavTreeFromParents(
  input: DatoNavigationResponseType | DatoNavigationProps[]
): NavTreeNode[] {
  const pages = Array.isArray(input) ? input : input.allPages;

  const byPath = new Map<string, NavTreeNode>();
  const parentPathByPath = new Map<string, string | undefined>();

  const getParentChain = (item: DatoNavigationProps): DatoNavigationProps[] => {
    const chain: DatoNavigationProps[] = [];
    const seen = new Set<DatoNavigationProps>();

    let current: DatoNavigationProps | undefined = item.parent?.[0];
    while (current && !seen.has(current)) {
      seen.add(current);
      chain.unshift(current);
      current = current.parent?.[0];
    }

    return chain;
  };

  const computePath = (item: DatoNavigationProps): string => {
    const chain = getParentChain(item);
    const slugs = [...chain.map((p) => p.slug), item.slug].map((s) =>
      s.replace(/^\/+|\/+$/g, "")
    );
    return `/${slugs.filter(Boolean).join("/")}`;
  };

  const ensureNode = (item: DatoNavigationProps): NavTreeNode => {
    const path = computePath(item);
    const existing = byPath.get(path);
    if (existing) return existing;

    const parent = item.parent?.[0];
    const parentPath = parent ? computePath(parent) : undefined;

    const node: NavTreeNode = {
      slug: item.slug,
      title: item.title,
      position: item.position,
      path,
      depth: 0,
      children: [],
      parentPath,
    };

    byPath.set(path, node);
    parentPathByPath.set(path, parentPath);
    return node;
  };

  for (const page of pages) ensureNode(page);

  for (const page of pages) {
    const node = ensureNode(page);

    const parent = page.parent?.[0];
    if (!parent) continue;

    const parentNode = ensureNode(parent);

    if (!parentNode.children.some((c) => c.path === node.path)) {
      parentNode.children = [...parentNode.children, node];
    }
  }

  const roots = [...byPath.values()].filter(
    (n) => !parentPathByPath.get(n.path)
  );

  const setDepths = (
    nodes: NavTreeNode[],
    depth: number,
    parentPath?: string
  ) => {
    for (const n of nodes) {
      n.depth = depth;
      n.parentPath = parentPath;
      setDepths(n.children, depth + 1, n.path);
    }
  };

  setDepths(roots, 0, undefined);

  return roots;
}
