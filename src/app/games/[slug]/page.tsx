import type { Metadata } from "next";
import { notFound } from 'next/navigation'

import { GameData, getGameData } from "../lib";

import styles from './page.module.css';

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;

  return {
    title: slug,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const gameSiteURL = process.env.GAMESITE_URL;
  const gameData: GameData = getGameData(params.slug);
  const iframeURL = gameSiteURL + "/" + gameData.name;

  if (gameData.name === "") {
    return notFound();
  }

  return (
    <div className={styles.game}>
      <iframe src={iframeURL} width={gameData.width} height={gameData.height}></iframe>
    </div>
  );
}
