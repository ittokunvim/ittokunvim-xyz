"use client";

import { useState } from "react";
import { IconDefinition, library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { iconLibrary } from "@/lib/fontawesome";
import styles from "./styles.module.css";

// FontAwesomeアイコンをライブラリに追加
library.add(iconLibrary);

export default function FontAwesomePng() {
  const [iconList, setIconList] = useState<IconDefinition[]>([]);
  const [inputIconValue, setInputIconValue] = useState<string>("");
  const handleInputIconChange = (value: string) => {
    setInputIconValue(value);
  };
  const handleInputIconSubmit = () => {
    const input = inputIconValue.trim();

    // 入力が空だった場合は何もしない
    if (!input) {
      setIconList([]);
      return;
    };

    try {
      // 正規表現を作成
      const regex = new RegExp(input, "i");
      // フィルタリング
      const searchIcons = iconLibrary.filter(icon => regex.test(icon.iconName));
      setIconList(searchIcons);
    } catch(error) {
      console.error("Invalid regular expression:", error);
      setIconList([]); // 無効な正規表現の場合は空リストを設定
    }
  };

  return (
    <div className={styles.fontawesome_png}>
      <div className={styles.input}>
        <input
          type="text"
          placeholder="face-awesome"
          value={inputIconValue}
          onChange={(e) => handleInputIconChange(e.target.value)}
        />
        <input
          type="submit"
          value="検索する"
          onClick={handleInputIconSubmit}
        />
      </div>
      <div className={styles.output}>
        <div className={styles.count}>{iconList.length} Icons</div>
        <div className={styles.list}>
          {iconList.map((icon, i) => (
            <div className={styles.item} key={i}>
              <div className={styles.icon}>
                <FontAwesomeIcon key={i} icon={[icon.prefix, icon.iconName]} size="2xl" />
              </div>
              <div className={styles.name}>{icon.iconName}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

