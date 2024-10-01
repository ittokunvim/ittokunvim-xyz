const gamesJsonUrl = process.env.NEXT_PUBLIC_GAMESITE_URL + "/data.json";

export type GameData = {
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

export async function getAllGameData(): Promise<GameData[]> {
  try {
    const response = await fetch(gamesJsonUrl, { cache: "no-store" });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getGameData(slug: string): Promise<GameData> {
  const games = await getAllGameData();
  const game = games.find((game: GameData) => game.slug === slug);

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

export function getGameThumbnail(game: GameData): GameThumbnail {
  const gameSiteURL = process.env.NEXT_PUBLIC_GAMESITE_URL;
  const { slug } = game;
  const src = `${gameSiteURL}/images/${slug}.png`;
  const alt = `${game.slug} thumbnail`;
  const [width, height] = ["300", "240"];

  return {
    src,
    alt,
    width,
    height,
  };
}
