import { FC } from "react";
import BlockWrapper from "../../BlockWrapper";
import { DefaultBlockProps } from "@/src/types/dato";

import News from "../../News";
import Headline from "../../Headline";

type NewsBlockType = DefaultBlockProps<{
  title?: string;
  limit?: number;
}>;

const NewsBlock: FC<NewsBlockType> = ({ title, limit, ...props }) => {
  return (
    <BlockWrapper
      name={props.__typename}
      className="py-xl pt-lg theme-primdary bg-purple/10"
    >
      {title && (
        <Headline
          title={title}
          link={{
            title: "Se alla nyheter",
            url: "https://www.svenskalag.se/iktord",
          }}
        />
      )}

      <News limit={limit} />
    </BlockWrapper>
  );
};

export default NewsBlock;
