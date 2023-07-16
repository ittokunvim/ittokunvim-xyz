import styles from "./page.module.css";

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
    </main>
  );
}
