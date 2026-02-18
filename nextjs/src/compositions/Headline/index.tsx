import { AnimatedText } from "@/src/components/AnimatedText";
import Button from "@/src/components/Button";
import Link from "next/link";
import { FC } from "react";

type HeadlineType = {
  title: string;
  text?: string;
  link?: { url: string; title: string };
};

const Headline: FC<HeadlineType> = ({ title, text, link }) => {
  return (
    <div className="grid grid-cols-6 md:grid-cols-12 gap-gutter py-sm">
      <div className="col-span-6 flex items-end">
        <AnimatedText
          as="h3"
          mode="chars"
          text={title}
          className="font-title leading-[.85]! text-xl text-primary"
        />

        {/* <h3 className="font-title leading-[.75]! text-xl text-primary">
          {title}
        </h3> */}
      </div>
      {(text || link) && (
        <div className="col-span-6 flex justify-end items-end">
          {text && <p>{text}</p>}
          {link && (
            <Button href={link.url}>{link.title}</Button>
            // <Link target="_blank" href={link.url}>
            //   {link.title}
            // </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Headline;
