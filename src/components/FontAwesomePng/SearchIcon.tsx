"use client";

import { useState } from "react";
import { IconDefinition, library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { iconLibrary } from "@/lib/fontawesome";
import styles from "./styles.module.css";

export type IconData = {
  prefix: string;
  iconName: string;
  width: number;
  height: number;
  data: string;
};

type Props = {
  searchIconAction: (iconData: IconData) => void;
};

// FontAwesomeアイコンをライブラリに追加
library.add(iconLibrary);

export default function SearchIcon({ searchIconAction}: Props) {
  const [iconList, setIconList] = useState<IconDefinition[]>([]);
  const [inputIconValue, setInputIconValue] = useState<string>("");
  // フォームの値が変更された時の処理
  const handleInputIconChange = (value: string) => {
    // 値を更新
    setInputIconValue(value);

    // 検索文字列を整形
    value = value.trim();

    // 入力が空だった場合は何もしない
    if (!value) {
      setIconList([]);
      return;
    };

    try {
      // 正規表現を作成
      const regex = new RegExp(value, "i");
      // 選択したアイコンをリセット
      searchIconAction(defaultIconData);
      // フィルタリング
      const searchIcons = iconLibrary.filter(icon => regex.test(icon.iconName));
      setIconList(searchIcons);
    } catch(error) {
      console.error("Invalid regular expression:", error);
      setIconList([]); // 無効な正規表現の場合は空リストを設定
    }
  };
  // アイコンをクリックした時の処理
  const handleClickItem = (icon: IconDefinition) => {
    const prefix = icon.prefix;
    const iconName = icon.iconName;
    const width = icon.icon[0];
    const height = icon.icon[1];
    const data = icon.icon[4].toString();

    // アイコンリストをクリア
    setIconList([]);
    // 選択されたアイコンのデータを保存
    searchIconAction({
      prefix,
      iconName,
      width,
      height,
      data,
    });
  };

  return (
    <div className={styles.search}>
      <div className={styles.form}>
        <label>アイコンを検索</label>
        <input
          type="text"
          placeholder="font-awesome"
          value={inputIconValue}
          onChange={(e) => handleInputIconChange(e.target.value)}
        />
      </div>
      <div className={styles.result}>
        <div className={styles.count}>アイコン数：{iconList.length}</div>
        <div className={styles.list}>
          {iconList.map((icon, i) => (
            <div className={styles.item} key={i} onClick={() => handleClickItem(icon)}>
              <div className={styles.icon}>
                <FontAwesomeIcon key={i} icon={[icon.prefix, icon.iconName]} />
              </div>
              <div className={styles.name}>{icon.iconName}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const defaultIconData: IconData = {
  prefix: "",
  iconName: "",
  width: 0,
  height: 0,
  data: "",
};

