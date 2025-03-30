import { Metadata } from "next";
import PachiBorder from "@/components/PachiBorder";
import { JsonLd, JsonLdScript } from "@/components/JsonLdScript";
import styles from "./page.module.css";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";
const title = "パチンコボーダー計算ツール";
const description = "パチンコボーダー計算ツールです";
const route = "/tools/pachi-border";
const url = BASE_URL + route;

export const metadata: Metadata = {
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
