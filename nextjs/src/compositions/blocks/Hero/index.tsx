"use client";
import { FC } from "react";
import BlockWrapper from "../../BlockWrapper";
import { DefaultBlockProps } from "@/src/types/dato";
import Image from "next/image";
import { RichText } from "@/src/components/RichText";
import { AnimatedText } from "@/src/components/AnimatedText";
import Logotype from "@/src/components/Logotype";

type HeroType = DefaultBlockProps<{
  title: string;
  text: string;
  media: {
    media: {
      asset: {
        url: string;
      };
    };
  };
}>;

const Hero: FC<HeroType> = ({ title, text, media: mediaBlock, ...props }) => {
  const heroMedia = mediaBlock.media.asset;
  return (
    <BlockWrapper
      name={props.__typename}
      width="full"
      className="relative flex items-center justify-start h-[65vh] md:h-auto"
    >
      {heroMedia.url && (
        <Image
          width={1400}
          height={900}
          alt=""
          src={heroMedia.url}
          className="pointer-none aspect-video object-cover h-full min-w-full"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-l from-purple/70 to-white/50 pointer-events-none backdrop-blur-xs"></div>

      <div className="absolute p-margin">
        <div className="flex flex-col gap-2">
          <AnimatedText
            text={title}
            className="font-title text-2xl text-purple leading-1"
          />
          {/* <h1 className="font-title text-2xl text-primary">{title}</h1> */}
          <div className="text-md">
            <RichText html={text} />
          </div>
        </div>
      </div>
      {/* <div className="absolute bottom-0 left-0 right-0 flex items-center justify-end mx-margin translate-y-1/2">
        <Logotype size="medium" className="" />
      </div> */}
    </BlockWrapper>
  );
};

export default Hero;
