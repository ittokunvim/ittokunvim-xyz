import data from "./data.json" assert { type: "json" };

export type GameData = {
  name: string;
  width: number;
  height: number;
};

export const gameList: GameData[] = data;

export function getGameData(slug: string): GameData {
  const slug_game = data.find((game: GameData) => game.name === slug);

  if (slug_game === undefined) {
    return {
      name: "",
      width: 0,
      height: 0,
    };
  }

  return slug_game;
}
