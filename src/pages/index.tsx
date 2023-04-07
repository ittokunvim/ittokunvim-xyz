import Layout from "@/components/layout";
import Head from "next/head";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Blog Ittoku Tech</title>
      </Head>
      <article className={styles.article}>
        <h1>Blog Ittoku Tech</h1>
        <p>
          Hello. My name is ittokun. Thank you for finding this site😆

        </p>
        <p>
          This site allows you to post, edit, and delete blog posts. Please take a look😎
        </p>
      <hr />
        <p>
          こんにちは。いっとくです。このサイトを見つけてくれてありがとう😆
        </p>
        <p>
          このサイトでは、ブログ記事を投稿、編集、削除することができます。ぜひ使ってみてください😎
        </p>
      </article>
    </Layout>
  );
}
