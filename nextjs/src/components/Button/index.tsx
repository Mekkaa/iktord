import classNames from "classnames";
import Link from "next/link";
import { FC, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

type ButtonType = {
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: Variant;
  children: ReactNode;
};

const commonClasses = [
  "group overflow-hidden font-bold leading-[1]",
  "flex items-center justify-start gap-sm rounded-full relative",
  "transition-all  cursor-pointer ",
  "outline-none focus-active whitespace-nowrap p-xs px-md text-md",
];

const variantClasses: Record<Variant, string[]> = {
  primary: [
    "bg-button-primary-bg text-button-primary-text",
    "hover:bg-button-primary-bg--hover hover:text-button-primary-text--hover",

    "disabled:bg-button-primary-bg--disabled disabled:text-button-primary-text--disabled",
  ],
  secondary: [
    "border-2 border-button-secondary-text",
    "bg-button-secondary-bg text-button-secondary-text",
    "hover:bg-button-secondary-bg--hover hover:text-button-secondary-text--hover",
    "disabled:bg-button-secondary-bg--disabled disabled:text-button-secondary-text--disabled",
  ],
  ghost: [
    "disabled:text-cloud hover:text-plum underline",
    "underline-offset-4",
  ],
};

const Button: FC<ButtonType> = ({
  className,
  variant = "primary",
  children,
  href,
  onClick,
}) => {
  const classes = classNames(
    commonClasses,
    ...variantClasses[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type="submit" className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
