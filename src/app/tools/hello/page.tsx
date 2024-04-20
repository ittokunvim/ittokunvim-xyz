import { Metadata } from "next";

import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Hello, world!",
  };
}

export default async function Page() {
  return <h1 className={styles.headline}>Hello, world!</h1>;
}
