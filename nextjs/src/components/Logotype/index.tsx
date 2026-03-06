import Image from "next/image";
import { FC } from "react";
// import imgSrc from '../../../public/IK_Tord_logo.svg.png';
import imgSrc from "../../../public/IK-Tord-vit-ram.png";
import classNames from "classnames";

type Sizes = "large" | "medium" | "small";

type LogotypeType = {
  className?: string;
  size?: Sizes;
};

const getImgSize = (size: Sizes): { width: number; height: number } => {
  switch (size) {
    case "large":
      return {
        width: 300,
        height: 100,
      };
    case "medium":
      return {
        width: 150,
        height: 75,
      };
    default:
      return {
        width: 50,
        height: 40,
      };
  }
};

const Logotype: FC<LogotypeType> = ({ className, size = "small" }) => {
  const imgSize = getImgSize(size);

  return (
    <div className={classNames(className)}>
      <Image alt="IK Tord logotyp" {...imgSize} src={imgSrc} />
    </div>
  );
};

export default Logotype;
