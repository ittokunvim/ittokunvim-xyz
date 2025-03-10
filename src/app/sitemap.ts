import { MetadataRoute } from "next";

import { fetchDocsJson } from "./docs/lib";
import { getGameSlugAll } from "@/lib/games";
import toolsJson from "@/lib/tools.json";

const BASE_URL = process.env.BASE_URL;

type Sitemap = {
  url: string,
  lastModified: Date,
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const docs = await fetchDocsJson();
  const game_slugs = await getGameSlugAll();

  const sitemap = (url: string) => {
    return {
      url,
      lastModified: new Date(),
    }
  }
  const routes: Sitemap[] = [
    sitemap(`${BASE_URL}/`),
    sitemap(`${BASE_URL}/nextjs`),
  ];
  const docsPage: Sitemap[] = docs.map((doc) => sitemap(`${BASE_URL}/docs/${doc.slug}`));
  const gamePages: Sitemap[] = game_slugs.map((slug) => sitemap(`${BASE_URL}/games/${slug}`));
  const toolsPage: Sitemap[] = toolsJson.map((tool) => sitemap(`${BASE_URL}/tools/${tool.slug}`));

  return [...routes, ...docsPage, ...gamePages, ...toolsPage];
}
