import { MetadataRoute } from "next";

import { getDocSlugAll } from "@/lib/docs";
import { fetchGamesJson } from "./games/lib";
import toolsJson from "@/lib/tools.json";

const BASE_URL = process.env.BASE_URL;

type Sitemap = {
  url: string,
  lastModified: Date,
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const doc_slugs = await getDocSlugAll();
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
  const docPages: Sitemap[] = doc_slugs.map((slug) => {
    return sitemap(`${BASE_URL}/docs/${slug}`);
  });
  const gamesPage: Sitemap[] = games.map((game) => sitemap(`${BASE_URL}/games/${game.slug}`));
  const toolsPage: Sitemap[] = toolsJson.map((tool) => sitemap(`${BASE_URL}/tools/${tool.slug}`));

  return [...routes, ...docPages, ...gamesPage, ...toolsPage];
}
