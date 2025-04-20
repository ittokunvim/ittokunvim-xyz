"use client";

import { useState } from "react";
import styles from "./styles.module.css";

export default function ConvertColorcode() {
  const [inputColorcodeValue, setInputColorcodeValue] = useState<string>("");
  const [inputRedValue, setInputRedValue] = useState<string>("");
  const [inputGreenValue, setInputGreenValue] = useState<string>("");
  const [inputBlueValue, setInputBlueValue] = useState<string>("");
  const [colorcodeValue, setColorcodeValue] = useState<string>("ffffff");
  const [redValue, setRedValue] = useState<string>("255");
  const [greenValue, setGreenValue] = useState<string>("255");
  const [blueValue, setBlueValue] = useState<string>("255");
  const [redPercentValue, setRedPercentValue] = useState<string>("1.0");
  const [greenPercentValue, setGreenPercentValue] = useState<string>("1.0");
  const [bluePercentValue, setBluePercentValue] = useState<string>("1.0");
  const handleInputColorcodeChange = (value: string) => {
    const regex = /^[A-Fa-f0-9]{1,6}$/;

    value = varidateInput(regex, value);
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
      <div className={styles.colorcode}>
        <input
          type="text"
          placeholder="# ffffff"
          value={inputColorcodeValue}
          onChange={(e) => handleInputColorcodeChange(e.target.value)}
        />
        <input
          type="submit"
          value="変換する"
          onClick={handleInputColorcodeSubmit}
        />
      </div>
      <div className={styles.rgb}>
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
      <div className={styles.output}>
        <table>
          <tbody>
            <tr>
              <th>16進数</th>
              <td colSpan={3}>{colorcodeValue}</td>
            </tr>
            <tr>
              <th>RGB</th>
              <td>{redValue}</td>
              <td>{greenValue}</td>
              <td>{blueValue}</td>
            </tr>
            <tr>
              <th>RGB パーセント</th>
              <td>{redPercentValue}</td>
              <td>{greenPercentValue}</td>
              <td>{bluePercentValue}</td>
            </tr>
          </tbody>
        </table>
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
