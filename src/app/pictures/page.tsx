import { Metadata } from "next";

import { MetadataProps, setMetadata } from "@/lib/utils";
import { PictureData, getPictureDataAll } from "@/lib/picture";
import PictureList from "@/components/PictureList";
import { JsonLd, JsonLdScript } from "@/components/JsonLdScript";

import styles from "./page.module.css";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";
const [title, name] = ["写真リスト", "写真リスト"];
const description = "写真の一覧を表示するページ";
const route = "/pictures";
const url = BASE_URL + route;
const metadataProps: MetadataProps = {
  title,
  description,
  url,
};

export const metadata: Metadata = setMetadata(metadataProps);

export default async function Page() {
  const pictures: PictureData[] = await getPictureDataAll();
  const jsonLd: JsonLd = {
    name,
    description,
  };

  return (
    <main className={styles.main}>
      <PictureList pictures={pictures} route={route} />
      <JsonLdScript data={jsonLd} />
    </main>
  );
}
