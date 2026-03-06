import { api } from "@/src/api/datoApi";

export const fetchNews = async (limit?: number) => {
  const news = await api.get.news();
  const { rss } = news;

  const items = rss.channel.item;

  if (limit) {
    return items?.slice(0, limit);
  }

  return items;
};
