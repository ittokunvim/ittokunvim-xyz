import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";

import { DocData } from "@/lib/docs";
import styles from "./index.module.css";

export default async function DocList(props: { docs: DocData[] }) {
  const { docs } = props;

  return (
    <article className={styles.docs}>
      <h3>
        <FontAwesomeIcon icon={faPencil} />
        記事一覧
      </h3>
      <div className={styles.list}>
        {docs.map((doc) => (
          <div className={styles.item} key={doc.href}>
            <div className={styles.title}>
              <Link href={doc.href}>{doc.title}</Link>
            </div>
            <div className={styles.description}>{doc.description}</div>
            <div className={styles.date}>
              <FontAwesomeIcon icon={faClock} />
              {`${doc.createdAt}に作成 ${doc.updatedAt}に更新`}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
