"use client";
import Button from "@/src/components/Button";
import Icons from "@/src/components/icons";
import Logotype from "@/src/components/Logotype";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { selectMenu, toggleMenu } from "@/src/redux/slices";
import Link from "next/link";
import { FC } from "react";
import Navigation from "../Navigation";
import { motion } from "framer-motion";

type HeaderType = {
  className?: string;
};

const Header: FC<HeaderType> = (props) => {
  const dispatch = useAppDispatch();
  const menu = useAppSelector(selectMenu);

  const menuIsOpen = !!menu?.isOpen;

  const handleMenuToggle = () => {
    dispatch(toggleMenu(!menu?.isOpen));
  };

  return (
    <div className="sticky top-0 p-gutter px-margin bg-purple z-50 flex items-center justify-between">
      <Link href={"/"} className=" flex items-center">
        <Logotype size="small" />
      </Link>
      <div className="relative bg-inherit">
        <Button onClick={handleMenuToggle}>
          <Icons.Bars />
        </Button>

        <motion.div
          className="absolute w-[500px] border-t-2 -bottom-gutter right-0 text-white translate-y-full z-30 p-md bg-inherit"
          initial={false}
          animate={menuIsOpen ? "open" : "closed"}
          variants={{
            closed: { opacity: 0, x: "100%", height: 0, pointerEvents: "none" },
            open: { opacity: 1, x: 0, pointerEvents: "auto", height: "auto" },
          }}
          transition={{ duration: 0.2 }}
        >
          <Link href={"/"} className=" flex items-center">
            Nav open
          </Link>
          <Navigation.Main show={menuIsOpen} />
        </motion.div>
      </div>
    </div>
  );
};

export default Header;
