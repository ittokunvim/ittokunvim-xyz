import type { Metadata } from "next";
import { NewsData, getNewsData } from "../lib";

import styles from "./page.module.css";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  const newsData: NewsData = await getNewsData(slug);

  return {
    title: newsData.title,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const newsData: NewsData = await getNewsData(slug);

  newsData.date = newsData.date.replace(/-/g, "/") + "に公開";

  return (
    <main className={styles.main}>
      <article className={styles.news}>
        <div className={styles.title}>{newsData.title}</div>
        <div className={styles.date}>{newsData.date}</div>
        <div
          className={styles.content_html}
          dangerouslySetInnerHTML={{ __html: newsData.contentHtml }}
        />
      </article>
    </main>
  );
}
