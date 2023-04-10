import Head from "next/head";
import Link from "next/link";

import Layout from "@/components/layout";
import styles from "@/styles/posts/list.module.css";
import Pager from "@/components/ui/pager";

export default function PostList() {
  const resp = {
    total_count: 2,
    posts: [
      {
        id: "f7c6436a-f346-4066-bee9-57ff9566ef51",
        title: "This is a post title",
        body: "This is a post body",
        created_at: "2023-03-26T10:04:39.445113",
        updated_at: "2023-03-26T10:04:39.445113"
      },
      {
        id: "07c6436a-f346-4066-bee9-57ff9566ef51",
        title: "Delete me",
        body: "hogebar",
        created_at: "2023-03-26T10:04:39.445113",
        updated_at: "2023-03-26T10:04:39.445113"
      }

    ]
  };

  return (
    <Layout>
      <Head>
        <title>Post List</title>
      </Head>
      <div className={styles.list_wrapper}>
        <h1 className={styles.headline}>Post List</h1>
        <div className={styles.list}>
          {resp.posts.map((post) =>
            <div key={post.id} className={styles.item}>
              <div className={styles.item_title}>{post.title}</div>
              <div className={styles.item_time}>Posted 2 days ago</div>
              <Link href={`/posts/${post.id}`} className={styles.item_link}></Link>
            </div>
          )}
        </div>
        <Pager path="/posts/list" query={"?page=1"} totalCount={resp.total_count} perPage={1} />
      </div>
    </Layout>
  );
}
