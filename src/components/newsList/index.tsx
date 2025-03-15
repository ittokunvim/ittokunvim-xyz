"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";

import { formatDate } from "@/lib/utils";
import { NewsData } from "@/lib/news";

import styles from "./index.module.css";

export default function NewsList(props: { news: NewsData[] }) {
  const news = props.news;

  return (
    <article className={styles.news}>
      <h3>
        <FontAwesomeIcon icon={faNewspaper} />
        ニュース一覧
      </h3>
      <div className={styles.list}>
        {news.map((news, id) => (
          <div className={styles.item} key={id}>
            <div className={styles.contents}>
              {news.contents.map((content, id) => (
                <div key={id}>{content}</div>
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
