"use client";

import { useEffect, useRef, useState } from "react";
import { IconDefinition, library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { iconLibrary } from "@/lib/fontawesome";
import styles from "./styles.module.css";

type IconData = {
  prefix: string;
  iconName: string;
  width: number;
  height: number;
  data: string;
};

// FontAwesomeアイコンをライブラリに追加
library.add(iconLibrary);

export default function FontAwesomePng() {
  const [iconList, setIconList] = useState<IconDefinition[]>([]);
  const [iconData, setIconData] = useState<IconData>(defaultSvgData);
  const [inputIconValue, setInputIconValue] = useState<string>("");
  const svgRef = useRef<SVGSVGElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // フォームの値が変更された時の処理
  const handleInputIconChange = (value: string) => {
    setInputIconValue(value);
  };
  // フォームのボタンが押された時の処理
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
  // アイコンをクリックした時の処理
  const handleClickItem = (icon: IconDefinition) => {
    // アイコンリストをクリア
    setIconList([]);

    // 選択されたアイコンのデータを保存
    setIconData({
      prefix: icon.prefix,
      iconName: icon.iconName,
      width: icon.icon[0],
      height: icon.icon[1],
      data: `${icon.icon[4]}`,
    });
  };
  // iconDataが更新された時の処理
  useEffect(() => {
    const svg = svgRef.current;
    const canvas = canvasRef.current;

    // SVG, Canvasの参照が見つからない時は終了
    if (!svg || !canvas) {
      console.error("svg or canvas is not found.");
      return;
    }

    // CanvasにSVGを描画する
    renderSvgToCanvas(svg, canvas);
  }, [iconData]);

  return (
    <div className={styles.fontawesome_png}>
      <div className={styles.form}>
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
      <div className={styles.result}>
        <div className={styles.count}>{iconList.length} Icons</div>
        <div className={styles.list}>
          {iconList.map((icon, i) => (
            <div className={styles.item} key={i} onClick={() => handleClickItem(icon)}>
              <div className={styles.icon}>
                <FontAwesomeIcon key={i} icon={[icon.prefix, icon.iconName]} size="2xl" />
              </div>
              <div className={styles.name}>{icon.iconName}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.canvas}>
        <canvas ref={canvasRef}></canvas>
      </div>
      <div className={styles.select}>
        <svg
          ref={svgRef}
          aria-hidden={true}
          focusable={false}
          data-prefix={iconData.prefix}
          data-icon={iconData.iconName}
          className={`svg-inline--fa ${iconData.iconName}`}
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${iconData.width} ${iconData.height}`}
        >
          <path
            fill="currentColor"
            d={`${iconData.data}`}
          ></path>
        </svg>
      </div>
    </div>
  );
}

const defaultSvgData: IconData = {
  prefix: "",
  iconName: "",
  width: 0,
  height: 0,
  data: "",
};

function renderSvgToCanvas(svg: SVGSVGElement, canvas: HTMLCanvasElement) {
  // SVG要素のシリアライズ
  const svgData = new XMLSerializer().serializeToString(svg);
  const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
  const svgUrl = URL.createObjectURL(svgBlob);

  // Canvasのサイズを設定
  canvas.width = canvas.height = 256;

  // Canvasの描画コンテキストを取得
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("Failed to get canvas context.");
    return;
  }

  // 画像オブジェクトを作成しSVGを読み込む
  const img = new Image();
  // 画像が正しく読み込まれたらCanvasに描画
  img.onload = () => {
    ctx?.drawImage(img, 0, 0);
    URL.revokeObjectURL(svgUrl);
  };
  // 画像が正しく読み込まれなかったら時のエラーハンドリング
  img.onerror = () => {
    console.error("Failed to load the SVG image.");
    URL.revokeObjectURL(svgUrl);
  };

  // 画像のソースにSVGの一時的なURLを設定
  img.src = svgUrl;
}
