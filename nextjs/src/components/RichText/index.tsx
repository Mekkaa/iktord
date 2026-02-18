"use client";

import parse, {
  domToReact,
  Element,
  type HTMLReactParserOptions,
} from "html-react-parser";
import NextLink from "next/link";
import Image from "next/image";

type Props = {
  html: string | null | undefined;
};

export function RichText({ html }: Props) {
  if (!html) return null;

  const options: HTMLReactParserOptions = {
    replace(node) {
      if (node instanceof Element && node.name === "a") {
        const href = node.attribs?.href ?? "";
        const children = domToReact(node.children as any, options);

        const isExternal = /^https?:\/\//.test(href);
        if (isExternal) {
          return (
            <a href={href} target="_blank" rel="noreferrer noopener">
              {children}
            </a>
          );
        }

        return <NextLink href={href || "/"}>{children}</NextLink>;
      }

      if (node instanceof Element && node.name === "img") {
        const src = node.attribs?.src ?? "";
        const alt = node.attribs?.alt ?? "";
        const width = Number(node.attribs?.width ?? 0);
        const height = Number(node.attribs?.height ?? 0);

        if (!src) return null;

        if (width > 0 && height > 0) {
          return <Image src={src} alt={alt} width={width} height={height} />;
        }

        return <img src={src} alt={alt} />;
      }

      return undefined;
    },
  };

  return <>{parse(html, options)}</>;
}
