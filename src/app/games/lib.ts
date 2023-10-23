const gamesJsonUrl = process.env.NEXT_PUBLIC_GAMESITE_URL + "/games.json";

export type GameData = {
  slug: string;
  name: string;
  description: string;
  width: number;
  height: number;
};

export async function getAllGameData(): Promise<GameData[]> {
  try {
    const response = await fetch(gamesJsonUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

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
