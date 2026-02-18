import Logotype from "@/src/components/Logotype";
import Link from "next/link";
import { FC } from "react";

type HeaderType = {
  className?: string;
};

const Header: FC<HeaderType> = (props) => {
  return (
    <div className="sticky top-0 p-gutter px-margin bg-purple z-50 flex items-center justify-between">
      <Link href={"/"} className=" flex items-center">
        <Logotype size="small" />
      </Link>
    </div>
  );
};

export default Header;
