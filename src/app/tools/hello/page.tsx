import { Metadata } from "next";
import { JsonLd, JsonLdScript } from "@/components/JsonLdScript";
import styles from "./page.module.css";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";
const title = "Hello, world";
const description = "This is a hello world page.";
const route = "/tools/hello";
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
    <>
      <h1 className={styles.headline}>{title}</h1>
      <JsonLdScript data={jsonLd} />
    </>
  );
}
