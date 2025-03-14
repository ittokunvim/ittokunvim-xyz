"use client"

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToolbox, } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { formatDate } from "@/lib/utils";
import { ToolData } from "@/lib/tools";
import styles from "./index.module.css";

export default function ToolList(props: { tools: ToolData[] }) {
  const tools = props.tools;

  return (
    <article className={styles.tools}>
      <h3>
        <FontAwesomeIcon icon={faToolbox} />
        ツール一覧
      </h3>
      <div className={styles.list}>
        {tools.map((tool) => (
          <div className={styles.item} key={tool.slug}>
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
