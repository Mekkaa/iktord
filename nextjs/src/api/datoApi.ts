import { executeQuery } from "@datocms/cda-client";
import { NewsRss } from "../types/news";
import { rssXmlToJson } from "../utils/XMLparser";
import {
  DatoNavigationResponseType,
  DatoPageResponseType,
  DatoPageType,
  DatoSlugsResponseType,
} from "../types/dato";
import { Queries } from "../graphql/queries";
import {
  denamespaceBlock,
  denamespacePage,
} from "../utils/convertBlockPropsNames";
import { buildNavTreeFromParents, NavTreeNode } from "../utils/navigation";

const qs = require("qs");

const convertBlockData = (page: { blocks: any }) => {
  const p = denamespacePage(page) as { blocks: any };

  if (!p) return [];

  const pageBlocks = p.blocks?.flatMap((block: any) => {
    if (block.__typename === "ComponentBlocksCommonBlock") {
      const blocksFromCommonBlocks = block.common_block.blocks as unknown[];
      return blocksFromCommonBlocks;
    }
    return [block];
  });

  const blocks = pageBlocks?.map(({ ...b }) => ({
    ...denamespaceBlock(b),
    block: denamespaceBlock(b),
  }));
  return blocks;
};

const getNews = async (): Promise<NewsRss> => {
  const url = "https://www.iktord.nu/rss/24296";
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`RSS fetch failed: ${res.status} ${res.statusText}`);
  }

  const xml = await res.text();
  return rssXmlToJson(xml) as NewsRss;
};

const getCMSData = async (query: string, variables?: any) => {
  const result = await executeQuery(query, {
    token: process.env.API_TOKEN_DRAFT || "",
    variables,
  });

  return result;
};

const getPage = async (slug: string): Promise<DatoPageType> => {
  const data = (await getCMSData(Queries.getPage, {
    slug,
  })) as DatoPageResponseType;
  const { page } = data;
  const pageBlocks = page?.blocks?.flatMap((block: any) => {
    if (block.__typename === "ComponentBlocksCommonBlock") {
      const blocksFromCommonBlocks = block.common_block.blocks as unknown[];
      return blocksFromCommonBlocks;
    }
    return [block];
  });
  const blocks = pageBlocks?.map(({ ...b }) => ({
    ...denamespaceBlock(b),
  })) as [];

  const pageData = { ...page, blocks };

  return pageData;
};

const getPageSlugs = async (
  excludeSlug: string
): Promise<{ slug: string; _locales: string[] }[]> => {
  const data = (await getCMSData(Queries.getSlugs, {
    excludeSlug,
  })) as DatoSlugsResponseType;

  return data?.allPages;
};

const getNavigation = async (locale: string): Promise<NavTreeNode[]> => {
  const data = (await getCMSData(Queries.getNavigation, {
    locale: locale || "sv",
  })) as DatoNavigationResponseType;

  const nav = buildNavTreeFromParents(data.allPages);

  return nav;
};

export const api = {
  get: {
    page: getPage,
    news: getNews,
    slugs: getPageSlugs,
    navigation: getNavigation,
  },
};
