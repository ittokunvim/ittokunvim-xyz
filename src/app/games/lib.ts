const gameSiteUrl = process.env.GAMESITE_URL;
const dataJsonUrl = gameSiteUrl + "/data.json";

export type JsonData = {
  slug: string;
  name: string;
  description: string;
  width: number;
  height: number;
};

type GameThumbnail = {
  src: string;
  alt: string;
  width: string;
  height: string;
};

export async function fetchGamesJson(): Promise<JsonData[]> {
  try {
    const response = await fetch(dataJsonUrl, { cache: "force-cache" });
    const data = await response.json();
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
      width: 0,
      height: 0,
    };
  }

  return game;
}

export function getGameThumbnail(game: JsonData): GameThumbnail {
  const { slug } = game;
  const src = `${gameSiteUrl}/images/${slug}.png`;
  const alt = `${game.slug} thumbnail`;
  const [width, height] = ["300", "240"];

  return {
    src,
    alt,
    width,
    height,
  };
}
