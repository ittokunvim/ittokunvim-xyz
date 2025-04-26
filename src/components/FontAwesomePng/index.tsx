"use client";

import { useEffect, useRef, useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { iconLibrary } from "@/lib/fontawesome";
import SearchIcon from "./SearchIcon";
import { IconData, defaultIconData } from "./SearchIcon";
import styles from "./styles.module.css";

// FontAwesomeアイコンをライブラリに追加
library.add(iconLibrary);

export default function FontAwesomePng() {
  const [iconData, setIconData] = useState<IconData>(defaultIconData);
  const [iconOptionWidth, setIconOptionWidth] = useState<number>(256);
  const [iconOptionHeight, setIconOptionHeight] = useState<number>(256);
  const [iconOptionColor, setIconOptionColor] = useState<string>("#000000");
  const [iconOptionBgColor, setIconOptionBgColor] = useState<string>("#ffffff");
  const svgRef = useRef<SVGSVGElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const searchIcon = (iconData: IconData) => {
    setIconData(iconData);
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

    // Svgのスタイルを設定
    svg.style.color = iconOptionColor;
    svg.style.backgroundColor = iconOptionBgColor;

    // Canvasのサイズを設定
    canvas.width = iconOptionWidth;
    canvas.height = iconOptionHeight;

    // CanvasにSVGを描画する
    renderSvgToCanvas(svg, canvas);
  }, [iconData]);
  const handleInputOptionWidth = (value: string) => {
    setIconOptionWidth(Number(value));
  };
  const handleInputOptionHeight = (value: string) => {
    setIconOptionHeight(Number(value));
  };
  const handleInputOptionColor = (value: string) => {
    setIconOptionColor(value);
  };
  const handleInputOptionBgColor = (value: string) => {
    setIconOptionBgColor(value);
  };

  return (
    <div className={styles.fontawesome_png}>
      <SearchIcon searchIconAction={searchIcon} />
      <div className={styles.canvas}>
        <canvas ref={canvasRef}></canvas>
      </div>
      <div
        className={styles.preview}
        style={{
          width: `${iconOptionWidth}px`,
          height: `${iconOptionHeight}px`,
        }}
      >
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
          style={{
            color: iconOptionColor,
            backgroundColor: iconOptionBgColor,
          }}
        >
          <path
            fill="currentColor"
            d={`${iconData.data}`}
          ></path>
        </svg>
      </div>
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
    </div>
  );
}

function renderSvgToCanvas(svg: SVGSVGElement, canvas: HTMLCanvasElement) {
  // SVG要素のシリアライズ
  const svgData = new XMLSerializer().serializeToString(svg);
  const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
  const svgUrl = URL.createObjectURL(svgBlob);

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
    ctx.drawImage(img, 0, 0);
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
