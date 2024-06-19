"use client";

import { useState } from "react";

import styles from "./page.module.css";

export default function PachiBorder() {
  const [ballCount, setBallCount] = useState("2500");
  const [spinCount, setSpinCount] = useState("180");

  const calculatePachiBorder = () => {
    const ballNumber = parseFloat(ballCount);
    const spinNumber = parseFloat(spinCount);
    const resultNumber = (spinNumber / ballNumber * 250).toFixed(1);

    if (isNaN(ballNumber) || isNaN(spinNumber) || resultNumber === "Infinity") {
      return 0;
    }

    return resultNumber;
  };

  return (
    <div className={styles.pachi_border}>
      <div>
        <label>玉数:</label>
        <input
          type="number"
          value={ballCount}
          placeholder="玉数"
          onChange={e => setBallCount(e.target.value)}
        />
      </div>
      <div>
        <label>回転数:</label>
        <input
          type="number"
          value={spinCount}
          placeholder="回転数"
          onChange={e => setSpinCount(e.target.value)}
        />
      </div>
      <div>
        <label>結果:</label>
        <span>{calculatePachiBorder()}</span>
      </div>
    </div>
  );
}
