import Image from "next/image";
import Link from "next/link";

import iconPng from "./icon.png";

import { fetchMarkdownJson } from "./articles/lib";
import { GameData, getAllGameData, getGameThumbnail } from "./games/lib";

import styles from "./page.module.css";

export default async function Home() {
  const articles = await fetchMarkdownJson();
  const games = await getAllGameData();

  return (
    <main className={styles.main}>
      <article className={styles.about}>
        <h3>About:</h3>
        <p>
          このサイトは<b>ittokunvim</b>
          のポートフォリオサイトです。ここには自身の活動内容を書いたりしていこうと思っています。
        </p>
        <br />
        <p>まだ何もないけどゆっくりしていってね😄</p>
      </article>
      <hr />
      <article className={styles.myprofile}>
        <h3>Profile:</h3>
        <div className={styles.profile}>
          <Image src={iconPng} alt="My icon" />
          <div className={styles.text}>
            <p>
              ittokunvimです。趣味でプログラムを書いています。最近はBevyというRust🦀で書かれたゲームエンジンを使ったゲーム開発をしています。
            </p>
            <br />
            <p>このサイトや、他のサイトに公開する予定なので、その際には是非ともプレイしてみてください。</p>
            <br />
            <p>あとはIT系の仕事も募集中です。ウェブ開発が得意分野なのでそのあたりの仕事ができたらなと思っています。</p>
          </div>
        </div>
      </article>
      <article className={styles.articles}>
        <h3>Articles:</h3>
        <div className={styles.list}>
          {articles.map((article) => (
            <div className={styles.item} key={article.slug}>
              <div className={styles.title}>
                <Link href={`/articles/${article.slug}`}>{article.title}</Link>
              </div>
            </div>
          ))}
        </div>
      </article>
      <article className={styles.games}>
        <h3>Games:</h3>
        <div className={styles.list}>
          {games.map((game) => (
            <div className={styles.item} key={game.slug}>
              <div className={styles.thumbnail}>{ImageGameThumbnail(game)}</div>
              <div className={styles.name}>
                <Link href={`/games/${game.slug}`}>{game.name}</Link>
              </div>
              <div className={styles.size}>{`Screen Size: ${game.width}x${game.height}`}</div>
              <div className={styles.description}>{game.description}</div>
            </div>
          ))}
        </div>
      </article>
    </main>
  );
}

function ImageGameThumbnail(game: GameData) {
  const { src, alt, width, height } = getGameThumbnail(game);
  return <img src={src} alt={alt} width={width} height={height} />;
}
