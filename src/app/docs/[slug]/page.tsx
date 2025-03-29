import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

import "@/lib/hljs.css";
import "@/lib/rlc.css";
import { getDocSlugAll, getDocData } from "@/lib/docs";
import { JsonLd, JsonLdScript } from "@/components/JsonLdScript";
import styles from "./page.module.css";

export const dynamic = "auto";
export const dynamicParams = false;

const BASE_URL = process.env.BASE_URL             || "";
const SITENAME = process.env.NEXT_PUBLIC_SITENAME || "";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  const docData = await getDocData(slug);
  const { title, description } = docData;
  const url = `${BASE_URL}/docs/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: SITENAME,
      locale: "ja_JP",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@ittokunvim",
      creator: "@ittokunvim",
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

export default async function Page({ params }: { params: { slug: string } }) {
  const docData = await getDocData(params.slug);
  const { title, createdAt, updatedAt, contentHtml } = docData;
  const jsonLd: JsonLd = {
    name: docData.title,
    description: docData.description,
  };

  if (title === "") {
    return notFound();
  }

  return (
    <main className={styles.main}>
      <article className={styles.docs}>
        <div className={styles.title}>{docData.title}</div>
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
