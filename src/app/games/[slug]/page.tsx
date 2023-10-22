import type { Metadata } from "next";
import { notFound } from 'next/navigation'

import { GameData, getGameData } from "../lib";

import styles from './page.module.css';
import Game from './game';

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
  const gameData: GameData = getGameData(params.slug);

  if (gameData.name === "") {
    return notFound();
  }

  return (
    <main className={styles.main}>
      <div className={styles.game}>
        <Game gameData={gameData} />
      </div>
    </main>
  );
}
