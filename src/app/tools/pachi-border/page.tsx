import { Metadata } from "next";
import styles from "./page.module.css";
import PachiBorder from "@/components/pachiBorder";

const title = "パチンコボーダー計算ツール";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: title,
  };
}

export default async function Page() {
  return (
    <main className={styles.main}>
      <div className={styles.wrap}>
        <h1>{title}</h1>
        <PachiBorder />
      </div>
    </main>
  );
}
