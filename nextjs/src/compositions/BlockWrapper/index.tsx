import classNames from "classnames";
import { FC, ReactNode } from "react";

type Width = "full" | "contain";

type BlockWrapperType = {
  width?: Width;
  name?: string;
  className?: string;
  children: ReactNode;
};

const BlockWrapper: FC<BlockWrapperType> = ({
  name,
  className,
  width = "contain",
  children,
}) => {
  const widthClasses: Record<Width, string[]> = {
    contain: ["px-margin"],
    full: [],
  };
  const classes = classNames(...widthClasses[width], className);

  return (
    <div data-block-name={name} className={classes}>
      {children}
    </div>
  );
};

export default BlockWrapper;
