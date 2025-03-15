import Link from "next/link";

import { faGamepad, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { GameData, getGameThumbnail } from "@/lib/games";
import styles from "./index.module.css";

export default async function GameList(props: { games: GameData[] }) {
  const games: GameData[] = props.games;

  return (
    <article className={styles.games}>
      <h3>
        <FontAwesomeIcon icon={faGamepad} />
        ゲーム一覧
      </h3>
      <div className={styles.list}>
        {games.map((game) => (
          <div className={styles.item} key={game.slug}>
            <div className={styles.thumbnail}>{ImageGameThumbnail(game.slug)}</div>
            <div className={styles.title}>
              <Link href={`/games/${game.slug}`}>{game.title}</Link>
            </div>
            <div className={styles.description}>{game.description}</div>
            <div className={styles.size}>{`Screen Size: ${game.size}`}</div>
            <div className={styles.date}>
              <p>
                <FontAwesomeIcon icon={faClock} />
                {`${game.createdAt}に作成`}
              </p>
              <p>
                <FontAwesomeIcon icon={faClock} />
                {`${game.updatedAt}に更新`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

function ImageGameThumbnail(slug: string) {
  const { src, alt, width, height } = getGameThumbnail(slug);
  return <img src={src} alt={alt} width={width} height={height} />;
}
