import { FC, Fragment } from "react";
import BlockWrapper from "../../BlockWrapper";
import { DatoLinkProps, DefaultBlockProps } from "@/src/types/dato";
import Image from "next/image";
import { RichText } from "@/src/components/RichText";
import PageLink from "@/src/components/PageLink";
import { AnimatedText } from "@/src/components/AnimatedText";

type CtaBlockType = DefaultBlockProps<{
  title: string;
  text: string;
  links?: DatoLinkProps[];
}>;

const CtaBlock: FC<CtaBlockType> = ({ title, text, links, ...props }) => {
  console.log("links", links);

  return (
    <BlockWrapper
      name={props.__typename}
      width="contain"
      className="grid grid-cols-6 md:grid-cols-12 gap-gutter py-lg"
    >
      <div className="col-span-6 md:col-span-3">
        <AnimatedText
          as="h3"
          duration={0.52}
          mode="words"
          className="font-title text-lg text-primary"
          text={title}
        />
      </div>
      <div className="col-span-6 md:col-span-5 md:col-start-7">
        <div className="flex flex-col gap-md text-md">
          <RichText html={text} />
          {links && (
            <div className="flex">
              {links.map((link, i) => (
                <Fragment key={`cta-${link.id}-${i}`}>
                  <PageLink {...link} />
                </Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </BlockWrapper>
  );
};

export default CtaBlock;
