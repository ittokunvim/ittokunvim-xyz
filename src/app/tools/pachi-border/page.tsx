import { Metadata } from "next";
import { MetadataProps, setMetadata } from "@/lib/utils";
import PachiBorder from "@/components/PachiBorder";
import { JsonLd, JsonLdScript } from "@/components/JsonLdScript";
import styles from "./page.module.css";
import { getToolData } from "@/lib/tools";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";
const slug = "pachi-border";
const tool = getToolData(slug);
const title = tool.name;
const description = tool.description;
const route = "/tools/" + slug;
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
    <main className={styles.main}>
      <div className={styles.title}>
        <h2>{title}</h2>
      </div>
      <PachiBorder />
      <JsonLdScript data={jsonLd} />
    </main>
  );
}
