import { Metadata } from "next";

import PachiBorder from "./pachiBorder";

import styles from "./page.module.css";

const title = "パチンコボーダー計算ツール";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: title,
  };
}

export default async function Page() {
  return (
    <main className={styles.main}>
      <h1>{title}</h1>
      <PachiBorder />
    </main>
  );
}
