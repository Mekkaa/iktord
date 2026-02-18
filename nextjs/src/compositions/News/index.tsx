import Card from "@/src/components/Card";

import { FC, Fragment } from "react";
import { fetchNews } from "./actions";

type NewsType = {
  limit?: number;
};

const News: FC<NewsType> = async ({ limit }) => {
  const items = await fetchNews(limit);

  return (
    <div className="grid grid-cols-12 gap-gutter">
      {items?.map((item) => (
        <Fragment key={item.guid?.["#text"]}>
          <Card.News {...item} className="col-span-6 md:col-span-3" />
        </Fragment>
      ))}
    </div>
  );
};

export default News;
