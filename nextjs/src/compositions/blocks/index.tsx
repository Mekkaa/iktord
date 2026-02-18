// blockDefinitions.ts
import dynamic from "next/dynamic";

// Define each unique block component once
const Hero = dynamic(() => import("./Hero"));
const News = dynamic(() => import("./News"));
const CtaBlock = dynamic(() => import("./CtaBlock"));

export const blockDefinitions = {
  HeroRecord: Hero,
  NewsRecord: News,
  CtaBlockRecord: CtaBlock,
};
