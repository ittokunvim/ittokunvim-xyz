"use client";

import { useState } from "react";
import styles from "./styles.module.css";

export type IconOption = {
  width: number;
  height: number;
  color: string;
  backgroundColor: string;
};

type Props = {
  updateOptionAction: (iconOption: IconOption) => void;
};

export default function OptionForm({ updateOptionAction }: Props) {
  // 親に渡すオプション値
  const iconOption: IconOption = defaultIconOption;
  // 各フォームの値
  const [iconOptionWidth, setIconOptionWidth] = useState<number>(iconOption.width);
  const [iconOptionHeight, setIconOptionHeight] = useState<number>(iconOption.height);
  const [iconOptionColor, setIconOptionColor] = useState<string>(iconOption.color);
  const [iconOptionBgColor, setIconOptionBgColor] = useState<string>(iconOption.backgroundColor);
  // 幅を指定するフォームが変更された時の処理
  const handleInputOptionWidth = (value: string) => {
    const width = Number(value);
    iconOption.width = width;

    setIconOptionWidth(width);
    updateOptionAction(iconOption);
  };
  // 高さを指定するフォームが変更された時の処理
  const handleInputOptionHeight = (value: string) => {
    const height = Number(value);
    iconOption.height = height;

    setIconOptionHeight(height);
    updateOptionAction(iconOption);
  };
  // アイコン色を指定するフォームが変更された時の処理
  const handleInputOptionColor = (value: string) => {
    iconOption.color = value;

    setIconOptionColor(value);
    updateOptionAction(iconOption);
  };
  // 背景色を指定するフォームが変更された時の処理
  const handleInputOptionBgColor = (value: string) => {
    iconOption.backgroundColor = value;

    setIconOptionBgColor(value);
    updateOptionAction(iconOption);
  };

  return (
    <div className={styles.option}>
      <div>
        <label>幅：</label>
        <input
          type="number"
          value={iconOptionWidth}
          onChange={(e) => handleInputOptionWidth(e.target.value)}
        />
        <span>px</span>
      </div>
      <div>
        <label>高さ：</label>
        <input
          type="number"
          value={iconOptionHeight}
          onChange={(e) => handleInputOptionHeight(e.target.value)}
        />
        <span>px</span>
      </div>
      <div>
        <label>アイコンの色：</label>
        <input
          type="color"
          value={iconOptionColor}
          onChange={(e) => handleInputOptionColor(e.target.value)}
        />
      </div>
      <div>
        <label>背景色：</label>
        <input
          type="color"
          value={iconOptionBgColor}
          onChange={(e) => handleInputOptionBgColor(e.target.value)}
        />
      </div>
    </div>
  );
}

export const defaultIconOption: IconOption =  {
  width: 128,
  height: 128,
  color: "#000000",
  backgroundColor: "#ffffff",
};

