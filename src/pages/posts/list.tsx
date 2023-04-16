import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

import Layout from "@/components/layout";
import styles from "@/styles/posts/list.module.css";
import Pager from "@/components/ui/pager";

export default function PostList() {
  const [data, setData] = useState({
    total_count: 0,
    posts: [
      { id: "", title: "", body: "", created_at: "", updated_at: "" }
    ]
  });

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
  }, [])

  return (
    <Layout>
      <Head>
        <title>Post List</title>
      </Head>
      <div className={styles.list_wrapper}>
        <h1 className={styles.headline}>Post List</h1>
        <div className={styles.list}>
          {data.posts.map((post) =>
            <div key={post.id} className={styles.item}>
              <div className={styles.item_title}>{post.title}</div>
              <div className={styles.item_time}>Posted 2 days ago</div>
              <Link href={`/posts/${post.id}`} className={styles.item_link}></Link>
            </div>
          )}
        </div>
        <Pager path="/posts/list" query={"?page=1"} totalCount={data.total_count} perPage={1} />
      </div>
    </Layout>
  );
}
