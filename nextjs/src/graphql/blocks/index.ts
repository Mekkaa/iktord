import { Snippets } from "../snippets";

const Hero = `
  ... on HeroRecord {
    HeroRecord__title: title
    HeroRecord__text: text(markdown: true)
    HeroRecord__media: ${Snippets.media}
  }
`;

const News = `
  ... on NewsRecord {
    NewsRecord__title: title
    NewsRecord__limit: limit
  }
`;

const Cta = `
  ... on CtaBlockRecord {
    CtaBlockRecord__title: title
    CtaBlockRecord__text: text(markdown: true)
    CtaBlockRecord__links: links {
      slug
      title
      ${Snippets.parent}
    }
  }
`;

export const allblocks = {
  Hero,
  News,
  Cta,
};

export const allBlockQueries = Object.values(allblocks).join("\n") as string;
