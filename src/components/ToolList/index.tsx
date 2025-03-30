"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToolbox, } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { formatDate } from "@/lib/utils";
import { ToolData } from "@/lib/tools";
import styles from "./styles.module.css";

type Props = {
  tools: ToolData[];
};

export default function ToolList({ tools }: Props) {
  return (
    <article className={styles.tools}>
      <h3>
        <FontAwesomeIcon icon={faToolbox} />
        ツール一覧
      </h3>
      <div className={styles.list}>
        {tools.map((tool, i) => (
          <div className={styles.item} key={i}>
            <div className={styles.name}>
              <Link href={`tools/${tool.slug}`}>{tool.name}</Link>
            </div>
            <div className={styles.description}>{tool.description}</div>
            <div className={styles.createdAt}>
              <FontAwesomeIcon icon={faClock} />
              {formatDate(tool.createdAt)}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
