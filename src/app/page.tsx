import styles from "./page.module.css";

import Image from "next/image";
import iconPng from "./icon.png";

export default function Home() {
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
            <p>ittokunvimです。趣味でプログラムを書いています。最近はBevyというRust🦀で書かれたゲームエンジンを使ったゲーム開発をしています。</p>
            <br />
            <p>このサイトや、他のサイトに公開する予定なので、その際には是非ともプレイしてみてください。</p>
            <br />
            <p>あとはIT系の仕事も募集中です。ウェブ開発が得意分野なのでそのあたりの仕事ができたらなと思っています。</p>
          </div>
        </div>
      </article>
    </main>
  );
}
