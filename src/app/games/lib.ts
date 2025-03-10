import { formatDate } from "@/lib/utils";

const GAMESITE_URL = process.env.GAMESITE_URL || "";
const GAMESITE_JSON_URL = process.env.GAMESITE_JSON_URL || "";

type JsonData = {
  slug: string;
  name: string;
  description: string;
  size: string;
  createdAt: string;
  updatedAt: string;
};

export type GameData = {
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

async function fetchGamesJson(): Promise<JsonData[]> {
  try {
    const response = await fetch(GAMESITE_JSON_URL, { cache: "force-cache" });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getGameDataAll(): Promise<GameData[]> {
  const games = await fetchGamesJson();
  let gamesData: GameData[] = [{
    slug: "",
    name: "",
    description: "",
    size: "",
    createdAt: "",
    updatedAt: "",
  }];

  games.sort((a: JsonData, b: JsonData) => {
    if (a.updatedAt === b.updatedAt) {
      return a.createdAt < b.createdAt ? 1 : -1;
    } else {
      return a.updatedAt < b.updatedAt ? 1 : -1;
    }
  });
  gamesData = games.map((game: JsonData) => {
    const slug = game.slug;
    const name = game.name;
    const description = game.description;
    const size = game.size;
    const createdAt = formatDate(game.createdAt);
    const updatedAt = formatDate(game.updatedAt);

    return { slug, name, description, size, createdAt, updatedAt };
  });

  return gamesData;
}

export async function getGameSlugAll(): Promise<string[]> {
  const games = await fetchGamesJson();
  return games.map((game: JsonData) => game.slug);
}

export async function getGameData(slug: string): Promise<GameData> {
  const games = await fetchGamesJson();
  const gameJson = games.find((game: JsonData) => game.slug === slug);
  let gameData: GameData = {
    slug: "",
    name: "",
    description: "",
    size: "",
    createdAt: "",
    updatedAt: "",
  };

  if (gameJson === undefined) {
    return gameData;
  }

  gameData.slug = gameJson.slug;
  gameData.name = gameJson.name;
  gameData.description = gameJson.description;
  gameData.size = gameJson.size;
  gameData.createdAt = formatDate(gameJson.createdAt);
  gameData.updatedAt = formatDate(gameJson.updatedAt);

  return gameData;
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
