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
  };
  const handleInputRgbSubmit = () => {
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
