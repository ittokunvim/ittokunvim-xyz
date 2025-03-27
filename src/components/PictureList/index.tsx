"use client";

import Link from "next/link";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";

import { PictureData } from "@/lib/picture";
import SearchForm from "./SearchForm";
import styles from "./style.module.css";

export type SearchData = {
  bonus: string;
  flag: string;
  album: string;
};

type Prop = {
  pictures: PictureData[];
  route: string;
};

export default function PictureList({ pictures, route }: Prop) {
  const [pictureList, setPictureList] = useState<PictureData[]>(pictures);
  const { alt, width, height } = {
    alt: "ittokunvim picture",
    width: 200,
    height: 200,
  };
  const searchPictures = ({ bonus, flag, album }: SearchData) => {
    if (bonus === "" && flag === "" && album === "") {
      setPictureList(pictures);
    }
    const bonusRegex = new RegExp(bonus, "i");
    const flagRegex = new RegExp(flag, "i");
    const albumRegex = new RegExp(album, "i");
    const searchPictureList = pictures.filter((picture) => {
      const isBonusTest = bonusRegex.test(picture.bonus);
      const isFlagTest = flagRegex.test(picture.flag);
      const isAlbumTest = albumRegex.test(picture.album);
      return (isBonusTest && isFlagTest && isAlbumTest);
    });

    setPictureList(searchPictureList);
  };

  return (
    <article className={styles.pictures}>
      <h3>
        <FontAwesomeIcon icon={faImage} />
        写真リスト
      </h3>
      {route === "/pictures" && (
        <SearchForm searchPicture={searchPictures} />
      )}
      <div className={styles.list}>
        {pictureList.map((picture, i) => (
          <div className={styles.item} key={i}>
            <div className={styles.image}>
              <img src={picture.path} alt={alt} width={width} height={height} />
            </div>
            <table>
              <tbody>
                <tr>
                  <th>ボーナス</th>
                  <td>{picture.bonus}</td>
                </tr>
                <tr>
                  <th>フラグ</th>
                  <td>{picture.flag}</td>
                </tr>
                <tr>
                  <th>アルバム</th>
                  <td>{picture.album}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
      {route === "/" && (
        <div className={styles.link}>
          <Link href="/pictures">もっと見る</Link>
        </div>
      )}
    </article>
  );
}

