import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faAddressCard,
} from "@fortawesome/free-solid-svg-icons";

import iconPng from "./icon.png";
import styles from "./page.module.css";
import { NewsData, getNewsListAll } from "@/lib/news";
import { DocData, getDocDataAll } from "@/lib/docs";
import { GameData, getGameDataAll } from "@/lib/games";
import { MusicData, getMusicDataAll } from "@/lib/music";
import { PictureData, getPictureDataAll } from "@/lib/picture";
import { ToolData, getToolDataAll } from "@/lib/tools";

import NewsList from "@/components/newsList";
import DocList from "@/components/DocList";
import GameList from "@/components/gameList";
import MusicList from "@/components/musicList";
import PictureList from "@/components/PictureList";
import ToolList from "@/components/toolList";
import { JsonLd, JsonLdScript } from "@/components/jsonLdScript";

const SITENAME    = process.env.NEXT_PUBLIC_SITENAME    || "";
const DESCRIPTION = process.env.NEXT_PUBLIC_DESCRIPTION || "";

export default async function Home() {
  const news: NewsData[] = getNewsListAll();
  const docs: DocData[] = await getDocDataAll();
  const games: GameData[] = await getGameDataAll();
  const music: MusicData[] = await getMusicDataAll();
  const pictures: PictureData[] = await getPictureDataAll();
  const tools: ToolData[] = getToolDataAll();
  const jsonLd: JsonLd = {
    name: SITENAME,
    description: DESCRIPTION,
  };

  return (
    <main className={styles.main}>
      <article className={styles.about}>
        <h3>
          <FontAwesomeIcon icon={faInfoCircle} />
          このサイトについて
        </h3>
        <p>
          {DESCRIPTION}
        </p>
        <br />
        <p>ゆっくりしていってね😄</p>
      </article>
      <hr />
      <article className={styles.myprofile}>
        <h3>
          <FontAwesomeIcon icon={faAddressCard} />
          自己紹介
        </h3>
        <div className={styles.profile}>
          <Image src={iconPng} alt="My icon" />
          <div className={styles.text}>
            <p>
              ittokunvimです。
              ゲーム開発をしたりTech系の記事を書いたりしています。
            </p>
            <br />
            <p>
              最近はゲームエンジンBevyを使ったゲーム開発にハマってます。
            </p>
            <p>記事やゲームはこのサイトに公開しているのでよければ覗いていってね。</p>
            <br />
          </div>
        </div>
      </article>
      <NewsList news={news} />
      <DocList docs={docs} />
      <GameList games={games} />
      <MusicList music={music.reverse().slice(0, 10)} route="/" />
      <PictureList pictures={pictures.slice(0, 10)} route="/" />
      <ToolList tools={tools} />
      <JsonLdScript data={jsonLd} />
    </main>
  );
}
