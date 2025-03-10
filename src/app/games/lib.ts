import { formatDate } from "@/lib/utils";

const GAME_SITE_URL = process.env.GAMESITE_URL || "";

export type JsonData = {
  slug: string;
  name: string;
  description: string;
  size: string;
  createdAt: string;
  updatedAt: string;
};

type GameThumbnail = {
  src: string;
  alt: string;
  width: string;
  height: string;
};

export async function fetchGamesJson(): Promise<JsonData[]> {
  const jsonUrl = `${GAME_SITE_URL}/data.json`;

  try {
    const response = await fetch(jsonUrl, { cache: "force-cache" });
    const data = await response.json();
    data.sort((a: JsonData, b: JsonData) => {
      if (a.updatedAt === b.updatedAt) {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else {
        return a.updatedAt < b.updatedAt ? 1 : -1;
      }
    });
    data.forEach((game: JsonData) => {
      game.createdAt = formatDate(game.createdAt);
      game.updatedAt = formatDate(game.updatedAt);
    });
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getGameData(slug: string): Promise<JsonData> {
  const games = await fetchGamesJson();
  const game = games.find((game: JsonData) => game.slug === slug);

  if (game === undefined) {
    return {
      slug: "",
      name: "",
      description: "",
      size: "",
      createdAt: "",
      updatedAt: "",
    };
  }

  return game;
}

export function getGameThumbnail(game: JsonData): GameThumbnail {
  const { slug } = game;
  const src = `${GAME_SITE_URL}/images/${slug}.png`;
  const alt = `${game.slug} thumbnail`;
  const [width, height] = ["300", "240"];

  return {
    src,
    alt,
    width,
    height,
  };
}
