import styles from "./page.module.css";

import Image from "next/image";
import iconPng from "./icon.png";

import { getAllNewsIds, getNewsData } from "./news/lib";

type NewsAllData = {
  slug: string;
  title: string;
  timesAgo: string;
};

function getTimesAgo(date: string): string {
  const now = new Date();
  const d = new Date(date);
  const diff = now.getTime() - d.getTime();
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (years > 0) {
    return `${years}年前`;
  } else if (months > 0) {
    return `${months}ヶ月前`;
  } else if (days > 0) {
    return `${days}日前`;
  } else {
    return "今日";
  }
}

async function getNewsAllData(): Promise<NewsAllData[]> {
  return await Promise.all(
    getAllNewsIds().map(async (slug) => {
      const data = await getNewsData(slug);
      const title = data.title;
      const timesAgo = getTimesAgo(data.date);

      return { slug, title, timesAgo, };
    })
  );
}

export default async function Home() {
  const news = await getNewsAllData();

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
            <p>
              このサイトや、他のサイトに公開する予定なので、その際には是非ともプレイしてみてください。
            </p>
            <br />
            <p>
              あとはIT系の仕事も募集中です。ウェブ開発が得意分野なのでそのあたりの仕事ができたらなと思っています。
            </p>
          </div>
        </div>
      </article>
    </main>
  );
}
