import { NewsItemProps } from "@/src/types/news";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { RichText } from "../RichText";

const NewsCard: FC<
  NewsItemProps & { className?: string; square?: boolean }
> = ({ title, description, enclosure, link, className, square }) => {
  const img = enclosure?.url;
  return (
    <Link href={link!} className={classNames(className, "bg-white group")}>
      {img && (
        <figure className="overflow-hidden rounded-sm ">
          <Image
            className={classNames(
              "aspect-video object-cover w-full group-hover:scale-[1.02] duration-300 ease-in-out transition-all"
            )}
            width="300"
            height="200"
            alt={title!}
            src={img}
          />
        </figure>
      )}
      <div className="flex flex-col gap-1 p-sm text-sm">
        <h3 className="font-title text-md text-primary">{title}</h3>
        {description && (
          <div
            className={
              " text-base line-clamp-2 text-black *:not-italic! [&>p>strong]:font-normal!"
            }
          >
            <RichText html={description} />
          </div>
        )}
      </div>
    </Link>
  );
};

const Card = {
  News: NewsCard,
};
export default Card;
