import { Metadata } from "next";
import { MetadataProps, setMetadata } from "@/lib/utils";
import { JsonLd, JsonLdScript } from "@/components/JsonLdScript";
import styles from "./page.module.css";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";
const title = "Hello, world";
const description = "This is a hello world page.";
const route = "/tools/hello";
const url = BASE_URL + route;
const metadataProps: MetadataProps = {
  title,
  description,
  url,
};

export const metadata: Metadata = setMetadata(metadataProps);

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
