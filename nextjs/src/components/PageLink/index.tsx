import DatoService from "@/src/services/DatoService";
import { DatoLinkProps } from "@/src/types/dato";
import Link, { LinkProps } from "next/link";
import { FC } from "react";
import Button from "../Button";

type PageLinkType = DatoLinkProps & {
  appearance?: "button" | "link";
};

const PageLink: FC<PageLinkType> = ({ appearance = "button", ...link }) => {
  const { title, ...linkProps } = DatoService.getLinkProps(link);

  if (appearance == "button") {
    return <Button href={linkProps.href}>{title}</Button>;
  }

  return <Link {...linkProps}>{title}</Link>;
};

export default PageLink;
