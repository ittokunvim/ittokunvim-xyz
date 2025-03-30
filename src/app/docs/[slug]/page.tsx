import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

import "@/config/hljs.css";
import "@/config/rlc.css";
import { DocContentData, getDocSlugAll, getDocData } from "@/lib/docs";
import { JsonLd, JsonLdScript } from "@/components/JsonLdScript";
import styles from "./page.module.css";

export const dynamic = "auto";
export const dynamicParams = false;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc: DocContentData = await getDocData(slug);
  const { title, description } = doc;
  const url = `${BASE_URL}/docs/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
    },
    twitter: {
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export async function generateStaticParams() {
  const docSlugs = await getDocSlugAll();
  return docSlugs.map((slug) => ({ slug: slug }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const doc: DocContentData = await getDocData(slug);
  const { title, description, createdAt, updatedAt, contentHtml } = doc;
  const jsonLd: JsonLd = {
    name: title,
    description,
  };

  if (title === "") {
    return notFound();
  }

  return (
    <main className={styles.main}>
      <article className={styles.docs}>
        <div className={styles.title}>{title}</div>
        <div className={styles.date}>
          <FontAwesomeIcon icon={faClock} />
          {`${createdAt}に作成 ${updatedAt}に更新`}
        </div>
        <div className={styles.content_html} dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
      <JsonLdScript data={jsonLd} />
    </main>
  );
}
