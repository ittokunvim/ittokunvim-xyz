import { Metadata } from "next";
import { PictureData, getPictureDataAll } from "@/lib/picture";
import PictureList from "@/components/PictureList";
import { JsonLd, JsonLdScript } from "@/components/JsonLdScript";
import styles from "./page.module.css";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";
const title = "写真リスト";
const description = "写真の一覧を表示するページ";
const route = "/pictures";

export async function generateMetadata(): Promise<Metadata> {
  const url = new URL(route, BASE_URL);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
    },
    twitter: {
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function Page() {
  const pictures: PictureData[] = await getPictureDataAll();
  const jsonLd: JsonLd = {
    name: title,
    description,
  };

  return (
    <main className={styles.main}>
      <PictureList pictures={pictures} route={route} />
      <JsonLdScript data={jsonLd} />
    </main>
  );
}
