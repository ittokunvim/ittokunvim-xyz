"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { MusicData } from "@/app/music/lib";
import styles from "./style.module.css";

export default function MusicList(props: { music: MusicData[] }) {
  const music: MusicData[] = props.music;

  return (
    <article className={styles.music}>
      <h3>
        <FontAwesomeIcon icon={faMusic} />
        ミュージック一覧
      </h3>
      <div className={styles.list}>
        {music.map((music) => (
          <div className={styles.item} key={music.title}>
            <div className={styles.title}>
              {music.title}
            </div>
            <div className={styles.artist}>{music.artist}</div>
            <div className={styles.createdAt}>{music.createdAt}に作成</div>
            <details className={styles.references}>
              <summary>参考リンク</summary>
              {music.references.map((reference) => (
                <a
                  key={reference}
                  href={reference}
                  target="_blank"
                  rel="noopener noreferrer"
                >{reference}</a>
              ))}
            </details>
          </div>
        ))}
      </div>
    </article>
  );
}
