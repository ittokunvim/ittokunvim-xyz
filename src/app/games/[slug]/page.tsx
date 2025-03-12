import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GameData, getGameSlugAll, getGameData } from "@/lib/games";
import styles from "./page.module.css";
import GameIframe from "@/components/gameIframe";
import { JsonLd, JsonLdScript } from "@/components/jsonLdScript";

export const dynamic = "auto";
export const dynamicParams = false;

const BASE_URL = process.env.BASE_URL             || "";
const SITENAME = process.env.NEXT_PUBLIC_SITENAME || "";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  const gameData = await getGameData(slug);
  const { title, description } = gameData;
  const url = `${BASE_URL}/games/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: SITENAME,
      locale: "ja_JP",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@ittokunvim",
      creator: "@ittokunvim",
    },
    alternates: {
      canonical: url,
    },
  };
}

export async function generateStaticParams() {
  const games_slug = await getGameSlugAll();
  return games_slug.map((slug) => ({ slug: slug }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const game: GameData = await getGameData(params.slug);
  const { slug, title, description, size, createdAt, updatedAt } = game;
  const jsonLd: JsonLd = { name: title, description };

  if (slug === "") {
    return notFound();
  }

  return (
    <main className={styles.main}>
      <div className={styles.game}>
        <GameIframe gameData={game} />
      </div>
      <div className={styles.description}>{description}</div>
      <div className={styles.info}>
        <table>
          <tbody>
            <tr>
              <th>Title</th>
              <td>{title}</td>
            </tr>
            <tr>
              <th>Size</th>
              <td>{size.split("x").join(" x ")}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{createdAt}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{updatedAt}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <JsonLdScript data={jsonLd} />
    </main>
  );
}
