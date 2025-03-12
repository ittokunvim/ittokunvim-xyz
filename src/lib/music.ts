import { formatDate } from "@/lib/utils"

const MUSICSITE_URL = process.env.MUSICSITE_URL || "";
const MUSICSITE_JSON_URL = process.env.MUSICSITE_JSON_URL || "";

type JsonData = {
  title: string;
  artist: string;
  references: string[];
  createdAt: string;
};

export type MusicData = {
  title: string;
  artist: string;
  path: string;
  references: string[];
  createdAt: string;
};

async function fetchMusicJson(): Promise<JsonData[]> {
  try {
    const response = await fetch(MUSICSITE_JSON_URL, { cache: "force-cache" });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getMusicDataAll(): Promise<MusicData[]> {
  const musicList = await fetchMusicJson();
  let musicDataList: MusicData[] = [{
    title: "",
    artist: "",
    path: "",
    references: [],
    createdAt: "",
  }];

  if (musicList === undefined) {
    return musicDataList;
  }

  musicDataList = musicList.map((music: JsonData) => {
    const title = music.title;
    const artist = music.artist;
    const path = `${MUSICSITE_URL}/music/${title}.mp3`;
    const references = music.references;
    const createdAt = formatDate(music.createdAt);

    return { title, artist, path, references, createdAt, };
  });

  return musicDataList;
}
