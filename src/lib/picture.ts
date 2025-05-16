const PICTURESITE_URL = process.env.PICTURESITE_URL || "";
const PICTURESITE_JSON_URL = process.env.PICTURESITE_JSON_URL || "";

type JsonData = {
  path: string;
  bonus: string;
  flag: string;
  album: string;
};

export type PictureData = {
  path: string;
  bonus: string;
  flag: string;
  album: string;
};

async function fetchPicturesJson(): Promise<JsonData[]> {
  try {
    const response = await fetch(PICTURESITE_JSON_URL, { cache: "force-cache" });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getPictureDataAll(): Promise<PictureData[]> {
  const pictureList = await fetchPicturesJson();
  let pictureDataList: PictureData[] = [{
    path: "",
    bonus: "",
    flag: "",
    album: "",
  }];

  if (pictureList === undefined) {
    return pictureDataList;
  }

  pictureDataList = pictureList.map((picture: JsonData) => {
    const path = new URL(picture.path, PICTURESITE_URL).toString();
    const bonus = picture.bonus;
    const flag = picture.flag;
    const album = picture.album;
    return { path, bonus, flag, album, };
  });

  return pictureDataList;
}
