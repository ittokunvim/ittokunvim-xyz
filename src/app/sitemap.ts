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
  const sitemap = (url: string) => {
    return {
      url,
      lastModified: new Date(),
    };
  };
  const routeList = [
    "/",
    "/nextjs",
    "/music",
    "/pictures",
  ];
  const docSlugs = await getDocSlugAll();
  const gameSlugs = await getGameSlugAll();
  const toolSlugs = getToolDataAll();
  const routes: Sitemap[] = routeList.map((route) => {
    return sitemap(route);
  });
  const docPages: Sitemap[] = docSlugs.map((slug) => {
    return sitemap(`${BASE_URL}/docs/${slug}`);
  });
  const gamePages: Sitemap[] = gameSlugs.map((slug) => {
    return sitemap(`${BASE_URL}/games/${slug}`);
  });
  const toolPages: Sitemap[] = toolSlugs.map((slug) => {
    return sitemap(`${BASE_URL}/tools/${slug}`);
  });

  return [...routes, ...docPages, ...gamePages, ...toolPages];
}
