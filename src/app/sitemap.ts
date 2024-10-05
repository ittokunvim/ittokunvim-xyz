import { MetadataRoute } from "next";

import { fetchDocsJson } from "./docs/lib";
import { fetchGamesJson } from "./games/lib";
import toolsJson from "./tools/data.json";

const base_url = process.env.BASE_URL;

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
    sitemap(`${base_url}/`),
    sitemap(`${base_url}/nextjs`),
  ];
  const docsPage: Sitemap[] = docs.map((doc) => sitemap(`${base_url}/docs/${doc.slug}`));
  const gamesPage: Sitemap[] = games.map((game) => sitemap(`${base_url}/games/${game.slug}`));
  const toolsPage: Sitemap[] = toolsJson.map((tool) => sitemap(`${base_url}/tools/${tool.slug}`));

  return [...routes, ...docsPage, ...gamesPage, ...toolsPage];
}
