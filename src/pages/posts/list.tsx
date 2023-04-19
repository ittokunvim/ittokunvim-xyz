import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Link from "next/link";

import Layout from "@/components/layout";
import styles from "@/styles/posts/list.module.css";
import Pager from "@/components/ui/pager";
import { PostListType } from "@/interfaces/post";

export default function PostList({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const posts: PostListType = data;

  return (
    <Layout>
      <Head>
        <title>Post List</title>
      </Head>
      <div className={styles.list_wrapper}>
        <h1 className={styles.headline}>Post List</h1>
        <div className={styles.list}>
          {posts.posts.map((post) =>
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

export const getServerSideProps: GetServerSideProps = async () => {
  const apiBaseURL = process.env.API_BASE_URL as string;
  const res = await fetch(`${apiBaseURL}/posts`);
  const data = await res.json();

  return {
    props: {
      data,
    }
  }
}
