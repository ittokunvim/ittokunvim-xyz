import { MetadataRoute } from "next";
import { getDocSlugAll } from "@/lib/docs";
import { getGameSlugAll } from "@/lib/games";
import { getToolDataAll } from "@/lib/tools";

const BASE_URL = process.env.BASE_URL;

type Sitemap = {
  url: string,
  lastModified: Date,
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const doc_slugs = await getDocSlugAll();
  const game_slugs = await getGameSlugAll();
  const tool_slugs = getToolDataAll();

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
    return sitemap(`${BASE_URL}/games/${slug}`);
  });
  const toolPages: Sitemap[] = tool_slugs.map((slug) => {
    return sitemap(`${BASE_URL}/tools/${slug}`);
  });

  return [...routes, ...docPages, ...gamePages, ...toolPages];
}
