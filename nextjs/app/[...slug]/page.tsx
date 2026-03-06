import { api } from "@/src/api/datoApi";
import PageWrapper from "@/src/components/PageWrapper";
import { blockDefinitions } from "@/src/compositions/blocks";
import DynamicZone from "@/src/compositions/DynamicZone";
import Image from "next/image";
import { ComponentType } from "react";

type PageProps = {
  params: Promise<{
    locale: string;
    slug: string[];
  }>;
};

export default async function Page({ params }: PageProps) {
  const { slug, locale } = await params;
  const pageSlug = typeof slug == "object" ? slug?.reverse()[0] : slug;

  const page = await api.get.page(pageSlug);
  console.log("page", page);

  return (
    <PageWrapper>
      <DynamicZone {...page} />
    </PageWrapper>
  );
}

export async function generateStaticParams() {
  const slugs = await api.get.slugs("home");
  console.log("slugs", slugs);

  // const staticParams = slugs.flatMap(({ slug, _locales }) =>
  //   _locales.map((locale) => ({
  //     slug,
  //     locale,
  //   }))
  // );
  const staticParams = slugs.map(({ slug, _locales }) => ({ slug: [slug] }));
  console.log("staticParams", staticParams);

  return staticParams;
}
