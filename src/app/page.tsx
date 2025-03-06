import Image from "next/image";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faAddressCard,
  faNewspaper,
  faGamepad,
  faToolbox,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";

import iconPng from "./icon.png";
import styles from "./page.module.css";
import { fetchNewsJson, fetchToolsJson, formatDate } from "./lib";
import {
  JsonData as DocJsonData,
  fetchDocsJson,
} from "./docs/lib";
import {
  JsonData as GameJsonData,
  fetchGamesJson,
  getGameThumbnail,
} from "./games/lib";
import { JsonLd, JsonLdScript } from "./jsonld";

const SITENAME    = process.env.NEXT_PUBLIC_SITENAME    || "";
const DESCRIPTION = process.env.NEXT_PUBLIC_DESCRIPTION || "";

export default async function Home() {
  const news = fetchNewsJson();
  const docs: DocJsonData[] = await fetchDocsJson();
  const games: GameJsonData[] = await fetchGamesJson();
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
      <article className={styles.docs}>
        <h3>
          <FontAwesomeIcon icon={faPencil} />
          記事一覧
        </h3>
        <div className={styles.list}>
          {docs.map((doc) => (
            <div className={styles.item} key={doc.slug}>
              <div className={styles.title}>
                <Link href={`/docs/${doc.slug}`}>{doc.title}</Link>
              </div>
              <div className={styles.description}>{doc.description}</div>
              <div className={styles.date}>
                <FontAwesomeIcon icon={faClock} />
                {`${doc.createdAt}に作成 ${doc.updatedAt}に更新`}
              </div>
            </div>
          ))}
        </div>
      </article>
      <article className={styles.games}>
        <h3>
          <FontAwesomeIcon icon={faGamepad} />
          ゲーム一覧
        </h3>
        <div className={styles.list}>
          {games.map((game) => (
            <div className={styles.item} key={game.slug}>
              <div className={styles.thumbnail}>{ImageGameThumbnail(game)}</div>
              <div className={styles.name}>
                <Link href={`/games/${game.slug}`}>{game.name}</Link>
              </div>
              <div className={styles.description}>{game.description}</div>
              <div className={styles.size}>{`Screen Size: ${game.size}`}</div>
              <div className={styles.date}>
                <p>
                  <FontAwesomeIcon icon={faClock} />
                  {`${game.createdAt}に作成`}
                </p>
                <p>
                  <FontAwesomeIcon icon={faClock} />
                  {`${game.updatedAt}に更新`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </article>
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

function ImageGameThumbnail(game: GameJsonData) {
  const { src, alt, width, height } = getGameThumbnail(game);
  return <img src={src} alt={alt} width={width} height={height} />;
}
