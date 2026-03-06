import { api } from "@/src/api/datoApi";
import PageWrapper from "@/src/components/PageWrapper";
import { blockDefinitions } from "@/src/compositions/blocks";
import DynamicZone from "@/src/compositions/DynamicZone";
import Image from "next/image";

export default async function Home() {
  const page = await api.get.page("start");

  console.log("page", page);

  return (
    <PageWrapper>
      <DynamicZone {...page} />
    </PageWrapper>
  );
}
