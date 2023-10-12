import type { Metadata } from "next";

import styles from './page.module.css';

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;

  return {
    title: slug,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const gameSiteURL = process.env.GAMESITE_URL;
  const slug = params.slug;
  const iframeURL = gameSiteURL + "/" + slug;

  return (
    <div className={styles.game}>
      <iframe src={iframeURL} width="1300" height="750"></iframe>
    </div>
  );
}
