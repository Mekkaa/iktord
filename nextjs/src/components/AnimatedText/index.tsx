"use client";
import React from "react";
import { motion, type MotionProps, type Variants } from "framer-motion";

type SplitMode = "words" | "chars";
type AsTag = keyof React.JSX.IntrinsicElements;

type AnimatedTextProps<TTag extends AsTag = "span"> = {
  text: string;
  as?: TTag;
  className?: string;
  mode?: SplitMode;
  once?: boolean;
  amount?: number;
  stagger?: number;
  margin?: string;
  duration?: number;
  y?: number;
  delay?: number;
} & Omit<React.ComponentPropsWithoutRef<TTag>, "children"> &
  MotionProps;

const containerVariants = (stagger: number, delay: number): Variants => ({
  hidden: {},
  show: {
    transition: {
      delayChildren: delay,
      staggerChildren: stagger,
    },
  },
});

const itemVariants = (duration: number, y: number): Variants => ({
  hidden: { opacity: 0, y },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: [0.22, 1, 0.36, 1] },
  },
});

const motionTag = motion as unknown as {
  [K in AsTag]: React.ComponentType<
    MotionProps & Omit<React.ComponentPropsWithoutRef<K>, "children">
  >;
};

export function AnimatedText<TTag extends AsTag = "span">(
  props: AnimatedTextProps<TTag>
) {
  const {
    text,
    as,
    className,
    mode = "chars",
    once = true,
    margin = "0px 0px -10% 0px",
    amount = 0.6,
    stagger = 0.04,
    duration = 0.6,
    y = 40,
    delay = 0,
    style,
    ...rest
  } = props;

  const Tag = (as ?? "span") as TTag;
  const MotionTag = motionTag[Tag] as any;

  const tokens = mode === "chars" ? Array.from(text) : text.split(/(\s+)/);

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin, amount }}
      variants={containerVariants(stagger, delay)}
      style={{ display: "inline-block", ...(style as React.CSSProperties) }}
    >
      {tokens.map((t, i) => {
        const isSpace = t.trim() === "";
        if (isSpace) {
          return (
            <span key={`s-${i}`} aria-hidden="true">
              {t}
            </span>
          );
        }

        return (
          <motion.span
            key={`t-${i}-${t}`}
            variants={itemVariants(duration, y)}
            style={{
              display: "inline-block",
              willChange: "transform, opacity",
            }}
          >
            {t}
          </motion.span>
        );
      })}
    </MotionTag>
  );
}
