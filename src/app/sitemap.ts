import { MetadataRoute } from "next";

import { fetchDocsJson } from "./docs/lib";
import { fetchGamesJson } from "./games/lib";
import toolsJson from "./tools/data.json";

const BASE_URL = process.env.BASE_URL;

type Sitemap = {
  url: string,
  lastModified: Date,
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const docs = await fetchDocsJson();
  const games = await fetchGamesJson();

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
  const gamesPage: Sitemap[] = games.map((game) => sitemap(`${BASE_URL}/games/${game.slug}`));
  const toolsPage: Sitemap[] = toolsJson.map((tool) => sitemap(`${BASE_URL}/tools/${tool.slug}`));

  return [...routes, ...docsPage, ...gamesPage, ...toolsPage];
}
