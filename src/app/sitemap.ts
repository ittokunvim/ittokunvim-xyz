import { MetadataRoute } from "next";

import { getDocSlugAll } from "@/lib/docs";
import { getGameSlugAll } from "@/lib/games";
import toolsJson from "@/lib/tools.json";

const BASE_URL = process.env.BASE_URL;

type Sitemap = {
  url: string,
  lastModified: Date,
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const doc_slugs = await getDocSlugAll();
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
  const docPages: Sitemap[] = doc_slugs.map((slug) => {
    return sitemap(`${BASE_URL}/docs/${slug}`);
  });
  const gamePages: Sitemap[] = game_slugs.map((slug) => {
    return sitemap(`${BASE_URL}/games/${slug}`));
  });
  const toolsPage: Sitemap[] = toolsJson.map((tool) => sitemap(`${BASE_URL}/tools/${tool.slug}`));

  return [...routes, ...docPages, ...gamePages, ...toolsPage];
}
