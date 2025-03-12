import Image from "next/image";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faAddressCard,
  faNewspaper,
  faToolbox,
} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";

import iconPng from "./icon.png";
import styles from "./page.module.css";
import { fetchNewsJson, fetchToolsJson, formatDate } from "@/lib/utils";
import { DocData, getDocDataAll } from "@/lib/docs";
import { GameData, getGameDataAll } from "@/lib/games";
import { MusicData, getMusicDataAll } from "@/app/music/lib";

import DocList from "@/components/DocList";
import GameList from "@/components/gameList";
import MusicList from "@/components/musicList";
import { JsonLd, JsonLdScript } from "@/components/jsonLdScript";

const SITENAME    = process.env.NEXT_PUBLIC_SITENAME    || "";
const DESCRIPTION = process.env.NEXT_PUBLIC_DESCRIPTION || "";

export default async function Home() {
  const news = fetchNewsJson();
  const docs: DocData[] = await getDocDataAll();
  const games: GameData[] = await getGameDataAll();
  const music: MusicData[] = await getMusicDataAll();
  const tools = fetchToolsJson();
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
      <article className={styles.news}>
        <h3>
          <FontAwesomeIcon icon={faNewspaper} />
          ニュース一覧
        </h3>
        <div className={styles.list}>
          {news.map((news) => (
            <div className={styles.item}>
              <div className={styles.contents}>
              {news.contents.map((content) => (
                <div>{content}</div>
              ))}
              </div>
              <div className={styles.createdAt}>
                <FontAwesomeIcon icon={faClock} />
                {formatDate(news.createdAt)}
              </div>
            </div>
          ))}
        </div>
      </article>
      <DocList docs={docs} />
      <GameList games={games} />
      <MusicList music={music}/>
      <article className={styles.tools}>
        <h3>
          <FontAwesomeIcon icon={faToolbox} />
          ツール一覧
        </h3>
        <div className={styles.list}>
          {tools.map((tool) => (
            <div className={styles.item} key={tool.slug}>
              <div className={styles.name}>
                <Link href={`tools/${tool.slug}`}>{tool.name}</Link>
              </div>
              <div className={styles.description}>{tool.description}</div>
              <div className={styles.createdAt}>
                <FontAwesomeIcon icon={faClock} />
                {formatDate(tool.createdAt)}
              </div>
            </div>
          ))}
        </div>
      </article>
      <JsonLdScript data={jsonLd} />
    </main>
  );
}
