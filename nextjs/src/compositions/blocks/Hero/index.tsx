"use client";
import { FC } from "react";
import BlockWrapper from "../../BlockWrapper";
import { DefaultBlockProps } from "@/src/types/dato";
import Image from "next/image";
import { RichText } from "@/src/components/RichText";
import { AnimatedText } from "@/src/components/AnimatedText";

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
      className="relative flex items-center justify-start"
    >
      {heroMedia.url && (
        <Image
          width={1400}
          height={900}
          alt=""
          src={heroMedia.url}
          className="pointer-none aspect-video object-cover w-full"
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
    </BlockWrapper>
  );
};

export default Hero;
