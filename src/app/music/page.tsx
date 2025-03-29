import { Metadata } from "next";
import { MusicData, getMusicDataAll } from "@/lib/music";
import MusicList from "@/components/MusicList";
import { JsonLd, JsonLdScript } from "@/components/JsonLdScript";
import styles from "./page.module.css";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";
const title = "ミュージック一覧";
const description = "音楽の一覧を表示するページ";

export async function generateMetadata(): Promise<Metadata> {
  const url = `${BASE_URL}/music`;

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
  const music: MusicData[] = await getMusicDataAll();
  const jsonLd: JsonLd = {
    name: title,
    description,
  };

  return (
    <main className={styles.main}>
      <MusicList music={music} route="/music" />
      <JsonLdScript data={jsonLd} />
    </main>
  );
}
