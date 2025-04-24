"use client";

import { library } from "@fortawesome/fontawesome-svg-core";
import { iconLibrary } from "@/lib/fontawesome";
import styles from "./styles.module.css";

// FontAwesomeアイコンをライブラリに追加
library.add(iconLibrary);

export default function() {
  return (
    <div className={styles.fontawesome_png}>
    </div>
  )
}

