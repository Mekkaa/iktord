import Card from "@/src/components/Card";

import { FC, Fragment } from "react";
import { fetchNews } from "./actions";
import classNames from "classnames";

type NewsType = {
  limit?: number;
};

const News: FC<NewsType> = async ({ limit }) => {
  const items = await fetchNews(limit);

  return (
    <div className="grid grid-cols-12 gap-gutter">
      {items?.map((item, i) => {
        const enlarge = i == 0 || i == 5;
        return (
          <Fragment key={item.guid?.["#text"]}>
            <Card.News
              {...item}
              square={enlarge}
              className={classNames(
                "col-span-6",
                // enlarge ? "md:col-span-6" : "md:col-span-3"
                "md:col-span-3"
              )}
            />
          </Fragment>
        );
      })}
    </div>
  );
};

export default News;
