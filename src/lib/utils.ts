import { Metadata } from "next";
import openGraphImage from "@/app/opengraph-image.jpg";

const SITENAME = process.env.NEXT_PUBLIC_SITENAME || "";

export type MetadataProps = {
  title: string,
  description: string,
  url: string,
};

export function setMetadata(props: MetadataProps): Metadata {
  const { title, description, url } = props;
  const images = openGraphImage.src;
  const siteName = SITENAME;
  const locale = "ja_JP";
  const type = "website";
  const card = "summary";
  const [site, creator] = ["@ittokunvim", "@ittokunvim"];

  return {
    title,
    description,
    openGraph: {
      images,
      title,
      description,
      url,
      siteName,
      locale,
      type,
    },
    twitter: {
      images,
      card,
      title,
      description,
      site,
      creator,
    },
    verification: {
      google: "",
    },
    alternates: {
      canonical: url,
    },
  };
}

export function formatDate(createdAt: string): string {
  const date = new Date(createdAt);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}年${month}月${day}日`;
}

export function formatYear(createdAt: string): string {
  const date = new Date(createdAt);
  const year = date.getFullYear();
  return `${year}年`;
}
