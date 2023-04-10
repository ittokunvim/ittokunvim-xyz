import Layout from "@/components/layout";
import Head from "next/head";

import styles from "@/styles/posts/create.module.css";

export default function PostCreate() {
  return (
    <Layout>
      <Head>
        <title>Post Create</title>
      </Head>
      <div className={styles.form}>
        <form action="/api/posts" method="post">
          <div className={styles.form_title}>
            <input type="text" name="title" placeholder="Title" />
          </div>
          <div className={styles.form_body}>
            <textarea name="body" placeholder="Leave a post" />
          </div>
          <input type="submit" value="Submit new post" />
        </form>
      </div>
    </Layout>
  );
}
