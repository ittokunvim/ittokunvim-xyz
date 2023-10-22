import data from "@/games.json" assert { type: "json" };

export type GameData = {
  slug: string;
  name: string;
  width: number;
  height: number;
};

export const gameList: GameData[] = data;

export function getGameData(slug: string): GameData {
  const slug_game = data.find((game: GameData) => game.slug === slug);

  if (slug_game === undefined) {
    return {
      slug: "",
      name: "",
      width: 0,
      height: 0,
    };
  }

  return slug_game;
}
