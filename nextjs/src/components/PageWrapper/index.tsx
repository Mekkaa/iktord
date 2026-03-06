"use client";
import { useAppSelector } from "@/src/redux/hooks";
import { selectMenu } from "@/src/redux/slices";
import classNames from "classnames";
import { FC, ReactNode } from "react";

type PageWrapperType = {
  children: ReactNode;
};

const PageWrapper: FC<PageWrapperType> = ({ children }) => {
  const menu = useAppSelector(selectMenu);

  return (
    <main
      className={classNames(
        "after:transition-all after:duration-500 after:inset-0 after:fixed",
        menu?.isOpen ? "after:bg-white/50 after:backdrop-blur-xs" : ""
      )}
    >
      {children}
    </main>
  );
};

export default PageWrapper;
