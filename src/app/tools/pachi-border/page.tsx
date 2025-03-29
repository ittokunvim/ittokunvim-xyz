import { Metadata } from "next";
import PachiBorder from "@/components/PachiBorder";
import { JsonLd, JsonLdScript } from "@/components/JsonLdScript";
import styles from "./page.module.css";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";
const title = "パチンコボーダー計算ツール";
const description = "パチンコボーダー計算ツールです";

export async function generateMetadata(): Promise<Metadata> {
  const url = `${BASE_URL}/tools/pachi-border`;

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

export default async function Page() {
  const jsonLd: JsonLd = {
    name: title,
    description,
  };

  return (
    <main className={styles.main}>
      <div className={styles.wrap}>
        <h1>{title}</h1>
        <PachiBorder />
      </div>
      <JsonLdScript data={jsonLd} />
    </main>
  );
}
