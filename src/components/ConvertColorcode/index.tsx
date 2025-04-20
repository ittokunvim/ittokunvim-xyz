"use client";

import { useState, useRef } from "react";
import styles from "./styles.module.css";

export default function ConvertColorcode() {
  const [inputColorcodeValue, setInputColorcodeValue] = useState<string>("");
  const [inputRedValue, setInputRedValue] = useState<string>("");
  const [inputGreenValue, setInputGreenValue] = useState<string>("");
  const [inputBlueValue, setInputBlueValue] = useState<string>("");
  const [colorcodeValue, setColorcodeValue] = useState<string>("");
  const [redValue, setRedValue] = useState<string>("");
  const [greenValue, setGreenValue] = useState<string>("");
  const [blueValue, setBlueValue] = useState<string>("");
  const [redPercentValue, setRedPercentValue] = useState<string>("");
  const [greenPercentValue, setGreenPercentValue] = useState<string>("");
  const [bluePercentValue, setBluePercentValue] = useState<string>("");
  const handleInputColorcodeChange = (value: string) => {
    const regex = /^[A-Fa-f0-9]{1,6}$/;

    value = varidateInput(regex, value.toUpperCase());
    setInputColorcodeValue(value);
  };
  const handleInputRedChange = (value: string) => {
    const regex = /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])$/;

    value = varidateInput(regex, value);
    setInputRedValue(value);
  };
  const handleInputGreenChange = (value: string) => {
    const regex = /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])$/;

    value = varidateInput(regex, value);
    setInputGreenValue(value);
  };
  const handleInputBlueChange = (value: string) => {
    const regex = /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])$/;

    value = varidateInput(regex, value);
    setInputBlueValue(value);
  };
  const handleInputColorcodeSubmit = () => {
    let hex = inputColorcodeValue.toUpperCase();

    // カラーコードの値が3,6桁でなければ何もしない
    if (hex.length != 3 && hex.length != 6) {
      return;
    }
    // 3桁のカラーコードを6桁のカラーコードに変換
    if (hex.length == 3) {
      hex = inputColorcodeValue.split("").map(c => c + c).join("");
    }

    // 16進数のカラーコードを10進数のRGB数値に変換
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    // 10進数のRGB値を文字列に変換
    const red = r.toString();
    const green = g.toString();
    const blue = b.toString();
    // 10進数のRGB値をRGBパーセント値に変換
    const redPercent = (r / 255).toFixed(2);
    const greenPercent = (g / 255).toFixed(2);
    const bluePercent = (b / 255).toFixed(2);
    // 値を代入
    setColorcodeValue(hex);
    setRedValue(red);
    setGreenValue(green);
    setBlueValue(blue);
    setRedPercentValue(redPercent);
    setGreenPercentValue(greenPercent);
    setBluePercentValue(bluePercent);
  };
  const handleInputRgbSubmit = () => {
    // RGB文字列を数値に変換
    const r = parseInt(inputRedValue);
    const g = parseInt(inputGreenValue);
    const b = parseInt(inputBlueValue);

    // RGBの値が１つでも空なら何もしない
    if (isNaN(r) || isNaN(g) || isNaN(b)) {
      return;
    }

    // RGB数値を16進数の文字列に変換
    const numToHex = (n: number): string => n.toString(16).padStart(2, "0");
    const hex = (numToHex(r) + numToHex(g) + numToHex(b)).toUpperCase();
    // 10進数のRGB値をRGBパーセント値に変換
    const redPercent = (r / 255).toFixed(2);
    const greenPercent = (g / 255).toFixed(2);
    const bluePercent = (b / 255).toFixed(2);
    // 値を代入
    setColorcodeValue(hex);
    setRedValue(inputRedValue);
    setGreenValue(inputGreenValue);
    setBlueValue(inputBlueValue);
    setRedPercentValue(redPercent);
    setGreenPercentValue(greenPercent);
    setBluePercentValue(bluePercent);
  };

  return (
    <div className={styles.convert_colorcode}>
      <div className={styles.input}>
        <div>
          <input
            type="text"
            placeholder="# FFFFFF"
            value={inputColorcodeValue}
            onChange={(e) => handleInputColorcodeChange(e.target.value)}
          />
          <input
            type="submit"
            value="変換する"
            onClick={handleInputColorcodeSubmit}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="R 255"
            value={inputRedValue}
            onChange={(e) => handleInputRedChange(e.target.value)}
          />
          <input
            type="text"
            placeholder="G 255"
            value={inputGreenValue}
            onChange={(e) => handleInputGreenChange(e.target.value)}
          />
          <input
            type="text"
            placeholder="B 255"
            value={inputBlueValue}
            onChange={(e) => handleInputBlueChange(e.target.value)}
          />
          <input
            type="submit"
            value="変換する"
            onClick={handleInputRgbSubmit}
          />
        </div>
      </div>
      <div className={styles.output}>
        <div
          className={styles.color}
          style={{ backgroundColor: `#${colorcodeValue}`}}
        ></div>
        <div className={styles.table}>
          <table>
            <thead>
              <tr>
                <th>カラーコード</th>
                <th>結果</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>16進数</th>
                <td><SelectableInput value={colorcodeValue} /></td>
              </tr>
              <tr>
                <th rowSpan={4}>RGB</th>
              </tr>
              <tr>
                <td><SelectableInput value={redValue} /></td>
              </tr>
              <tr>
                <td><SelectableInput value={greenValue} /></td>
              </tr>
              <tr>
                <td><SelectableInput value={blueValue} /></td>
              </tr>
              <tr>
                <th rowSpan={4}>RGB パーセント</th>
              </tr>
              <tr>
                <td><SelectableInput value={redPercentValue} /></td>
              </tr>
              <tr>
                <td><SelectableInput value={greenPercentValue} /></td>
              </tr>
              <tr>
                <td><SelectableInput value={bluePercentValue} /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function varidateInput(regex: RegExp, value: string): string {
  if (!regex.test(value)) {
    return value.slice(0, -1);
  }
  return value;
}

function SelectableInput({ value }: { value: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  };
  return (
    <input
      type="text"
      placeholder="カラーコード"
      disabled={value == ""}
      value={value}
      ref={inputRef}
      onClick={handleClick}
    />
  );
}
