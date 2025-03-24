"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import styles from "./style.module.css";
import { PictureData } from "@/lib/picture";

type Prop = {
  pictures: PictureData[];
  route: string;
};

export default function PictureList(props: Prop) {
  const { pictures, route } = props;
  const { alt, width, height } = {
    alt: "ittokunvim picture",
    width: 200,
    height: 200,
  };

  return (
    <article className={styles.pictures}>
      <h3>
        <FontAwesomeIcon icon={faImage} />
        写真リスト
      </h3>
      <div className={styles.list}>
        {pictures.map((picture, i) => (
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

