"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { MusicData } from "@/lib/music";
import styles from "./style.module.css";

export default function MusicList(props: { music: MusicData[] }) {
  const music: MusicData[] = [...props.music].reverse().slice(0, 10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    setAudio(new Audio());
  }, []);

  const handleClick = (path: string) => {
    if (!audio) return;
    audio.src = path;

    if (!isPlaying) {
      setIsPlaying(true);
      audio.play();
    } else {
      setIsPlaying(false);
      audio.pause();
    }
  };

  const toggleIcon = (path: string) => {
    if (!audio) return faPlay;
    if (isPlaying && audio.src === encodeURI(path)) {
      return faPause;
    } else {
      return faPlay;
    }
  };

  return (
    <article className={styles.music}>
      <h3>
        <FontAwesomeIcon icon={faMusic} />
        ミュージック一覧
      </h3>
      <div className={styles.list}>
        {music.map((music) => (
          <div className={styles.item} key={music.title}>
            <div className={styles.title} onClick={() => handleClick(music.path)}>
              <FontAwesomeIcon icon={toggleIcon(music.path)} />
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
      <div className={styles.link}>
        <Link href="/music">もっと見る</Link>
      </div>
    </article>
  );
}
