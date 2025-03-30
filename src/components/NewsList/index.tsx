"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { formatDate } from "@/lib/utils";
import { NewsData } from "@/lib/news";
import styles from "./styles.module.css";

type Props = {
  newsList: NewsData[];
};

export default function NewsList({ newsList }: Props) {
  return (
    <article className={styles.news}>
      <h3>
        <FontAwesomeIcon icon={faNewspaper} />
        ニュース一覧
      </h3>
      <div className={styles.list}>
        {newsList.map((news, i) => (
          <div className={styles.item} key={i}>
            <div className={styles.contents}>
              {news.contents.map((content, i) => (
                <div key={i}>{content}</div>
              ))}
            </div>
            <div className={styles.createdAt}>
              <FontAwesomeIcon icon={faClock} />
              {formatDate(news.createdAt)}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
