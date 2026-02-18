import Logotype from "@/src/components/Logotype";
import { FC } from "react";
import BlockWrapper from "../BlockWrapper";
import Link from "next/link";
import { JustifyText } from "@/src/components/JustifyText";
import classNames from "classnames";

type FooterType = {
  className?: string;
};

const Footer: FC<FooterType> = (props) => {
  const flexClasses = "flex items-center justify-center";
  const boxClasses = "p-12 w-full text-white";
  return (
    <BlockWrapper className="pt-xl bg-purple grid grid-cols-6 md:grid-cols-12 gap-gutter gap-y-lg">
      <div className="col-span-3 md:col-span-2 md:col-start-2">
        <Logotype size="large" className="" />
      </div>
      <div className="col-span-3 md:col-span-4 md:col-start-8 text-white flex flex-col gap-md items-end justify-end">
        <p className="text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
          illum molestiae adipisci fuga dolores mollitia sit aliquam. At vero
          nulla maiores tempore ipsam ut eum itaque non, earum, facere
          molestias?
        </p>
        <div className="flex gap-sm">
          <Link href={""}>Link</Link>
        </div>
      </div>

      <div className="col-span-6 py-xl md:col-span-10 md:col-start-2 border-t-12 border-white flex justify-center">
        <div className="w-full uppercase font-title text-white">
          <JustifyText>En gång lila alltid lila </JustifyText>
        </div>
      </div>

      {/* <div className="col-span-12 grid grid-cols-12">
        <div className="col-span-8">
          <div
            className={classNames(
              boxClasses,
              flexClasses,
              "flex-col items-end text-end gap-md"
            )}
          >
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
              illum molestiae adipisci fuga dolores mollitia sit aliquam. At
              vero nulla maiores tempore ipsam ut eum itaque non, earum, facere
              molestias?
            </p>
            <div className="flex gap-sm">
              <Link href={""}>Link</Link>
              <Link href={""}>Link</Link>
            </div>
          </div>
        </div>
        <div className="col-span-4 border-l-22 border-white">
          <div className={classNames(boxClasses, flexClasses)}>
            <div className="flex gap-sm">
              <Link href={""}>Link</Link>
              <Link href={""}>Link</Link>
            </div>
          </div>
        </div>
        <div
          className={classNames(
            "col-span-8 border-t-22 border-white",
            flexClasses
          )}
        >
          <div className={classNames(boxClasses, flexClasses)}>
            <div className="w-full uppercase font-title text-white">
              <JustifyText>En gång lila alltid lila </JustifyText>
            </div>
          </div>
        </div>
        <div className="col-span-4 border-l-22 border-t-22 border-white">
          <div className={classNames(boxClasses, flexClasses)}>
            <Logotype size="large" className="" />
          </div>
        </div>
      </div> */}
    </BlockWrapper>
  );
};

export default Footer;
