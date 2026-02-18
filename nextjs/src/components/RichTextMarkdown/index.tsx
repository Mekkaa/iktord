import Link from "next/link";
import { FC } from "react";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

type RichTextMarkdownType = {
  markdown: string | null | undefined;
};

const RichTextMarkdown: FC<RichTextMarkdownType> = ({ markdown }) => {
  console.log("RTE markdown", markdown);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSanitize]}
      components={{
        a: ({ href, children, ...props }) => {
          const url = href ?? "";
          const isExternal = /^https?:\/\//.test(url);

          if (!url) return <a {...props}>{children}</a>;

          if (isExternal) {
            return (
              <a
                href={url}
                target="_blank"
                rel="noreferrer noopener"
                {...props}
              >
                {children}
              </a>
            );
          }

          return (
            <Link href={url} {...(props as any)}>
              {children}
            </Link>
          );
        },
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
};

export default RichTextMarkdown;
