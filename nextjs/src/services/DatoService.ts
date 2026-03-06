import { DatoLinkProps } from "../types/dato";

export const getParentSlugsFlat = (link: DatoLinkProps): string[] => {
  const slugs: string[] = [];
  let current = link.parent;

  while (current) {
    slugs.push(current.slug);
    current = current.parent;
  }

  return slugs;
};

const getLinkProps = (link: DatoLinkProps): { href: string; title: string } => {
  const parentSlugs = getParentSlugsFlat(link);
  const { slug, title } = link;
  console.log("parentSlugs", parentSlugs);

  const href =
    (parentSlugs.length > 0 ? parentSlugs.join("/") + "/" : "") + `${slug}`;

  return {
    href,
    title,
  };
};

const DatoService = {
  getLinkProps,
};

export default DatoService;
