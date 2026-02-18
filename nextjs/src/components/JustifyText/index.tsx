"use client";
import React, { useEffect, useMemo, useRef } from "react";

type JustifyTextProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "span" | "p";
};

function flattenToTextLines(node: React.ReactNode): string[] {
  const out: string[] = [];

  const walk = (n: React.ReactNode): void => {
    if (n == null || typeof n === "boolean") return;

    if (typeof n === "string" || typeof n === "number") {
      out.push(String(n));
      return;
    }

    if (Array.isArray(n)) {
      n.forEach(walk);
      return;
    }

    if (React.isValidElement(n)) {
      const el = n as React.ReactElement<{ children?: React.ReactNode }>;
      walk(el.props.children);
      return;
    }
  };

  walk(node);

  return out
    .join("")
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

export function JustifyText({
  children,
  className,
  as = "div",
}: JustifyTextProps) {
  const containerRef = useRef<
    HTMLDivElement | HTMLSpanElement | HTMLParagraphElement | null
  >(null);

  const lines = useMemo(() => flattenToTextLines(children), [children]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resize = () => {
      const boxW = container.clientWidth;
      const spans = Array.from(
        container.querySelectorAll<HTMLElement>("[data-jt-line]")
      );

      spans.forEach((el) => {
        el.style.fontSize = "";
        el.style.height = "";

        const textW = el.scrollWidth;

        if (textW > 0 && textW < boxW) {
          const ratio = boxW / textW;
          el.style.fontSize = `${ratio}rem`;
          el.style.height = `${ratio}rem`;
        }
      });
    };

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    return () => observer.disconnect();
  }, [lines]);

  if (as === "span") {
    return (
      <span
        ref={containerRef as React.RefObject<HTMLSpanElement>}
        className={className}
      >
        {lines.map((line, i) => (
          <span
            key={i}
            data-jt-line
            style={{
              display: "inline-block",
              whiteSpace: "nowrap",
              lineHeight: 1,
            }}
          >
            {line}
          </span>
        ))}
      </span>
    );
  }

  if (as === "p") {
    return (
      <p
        ref={containerRef as React.RefObject<HTMLParagraphElement>}
        className={className}
      >
        {lines.map((line, i) => (
          <span
            key={i}
            data-jt-line
            style={{
              display: "inline-block",
              whiteSpace: "nowrap",
              lineHeight: 1,
            }}
          >
            {line}
          </span>
        ))}
      </p>
    );
  }

  return (
    <div
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className={className}
    >
      {lines.map((line, i) => (
        <span
          key={i}
          data-jt-line
          style={{
            display: "inline-block",
            whiteSpace: "nowrap",
            lineHeight: 1,
          }}
        >
          {line}
        </span>
      ))}
    </div>
  );
}
