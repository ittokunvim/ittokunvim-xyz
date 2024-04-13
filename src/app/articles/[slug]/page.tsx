import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

import { getArticleData } from "../lib";

import styles from "./page.module.css";
import "./hljs.css";
import "./rlc.css";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  const articleData = await getArticleData(slug);

  if (articleData === undefined) {
    return {}
  }

  return {
    title: articleData.title,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const articleData = await getArticleData(slug);

  if (articleData=== undefined) {
    return notFound();
  }

  return (
    <main className={styles.main}>
      <article className={styles.articles}>
        <div className={styles.title}>{articleData.title}</div>
        <div className={styles.createdAt}>
          <FontAwesomeIcon icon={faClock} />
          {articleData.createdAt}
        </div>
        <div className={styles.content_html} dangerouslySetInnerHTML={{ __html: articleData.contentHtml }} />
      </article>
    </main>
  );
}
