// denamespace.ts
type AnyObj = Record<string, unknown>;

function isPlainObj(x: unknown): x is AnyObj {
  return typeof x === "object" && x !== null && !Array.isArray(x);
}

function hasTypename(x: unknown): x is AnyObj & { __typename: string } {
  return isPlainObj(x) && typeof x.__typename === "string";
}

/**
 * Remove `<Typename>__` prefixes from the direct fields of a block,
 * then deep-recurse into all values.
 */
export function denamespaceBlock<T extends AnyObj>(block: T): AnyObj {
  const typename = block.__typename as string;
  const prefix = `${typename}__`;
  const out: AnyObj = { __typename: typename };

  for (const [k, v] of Object.entries(block)) {
    if (k === "__typename") continue;
    const key = k.startsWith(prefix) ? k.slice(prefix.length) : k;
    out[key] = deepDenamespace(v);
  }
  return out;
}

/**
 * Deeply traverse any value, denamespacing whenever a block (`__typename`) is found.
 * Also auto-detects arrays of blocks anywhere (e.g. `blocks`, `common_blocks`, etc.).
 */
export function deepDenamespace(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => deepDenamespace(item));
  }
  if (hasTypename(value)) {
    return denamespaceBlock(value);
  }
  if (isPlainObj(value)) {
    const out: AnyObj = {};
    for (const [k, v] of Object.entries(value)) {
      // If this property is an array of blocks, map each via denamespaceBlock.
      if (Array.isArray(v) && v.every((el) => hasTypename(el))) {
        out[k] = (v as AnyObj[]).map((el) => denamespaceBlock(el));
      } else {
        out[k] = deepDenamespace(v);
      }
    }
    return out;
  }
  return value;
}

/**
 * Entry helpers for your response shapes
 */
export function denamespacePagesResult(input: { pages: Array<AnyObj> }): {
  pages: Array<AnyObj>;
} {
  return {
    pages: input.pages.map((p) => deepDenamespace(p) as AnyObj),
  };
}

// If you sometimes query a single page
export function denamespacePage(p: AnyObj): AnyObj {
  return deepDenamespace(p) as AnyObj;
}
