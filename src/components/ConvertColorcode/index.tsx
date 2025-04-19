"use client";

import styles from "./styles.module.css";

export default function ConvertColorcode() {
  return (
    <div className={styles.convert_colorcode}>
      <div className={styles.colorcode}>
        <input type="text" placeholder="# ffffff" />
        <input type="submit" value="変換する" />
      </div>
      <div className={styles.rgb}>
        <input type="text" placeholder="R 255" />
        <input type="text" placeholder="G 255" />
        <input type="text" placeholder="B 255" />
        <input type="submit" value="変換する" />
      </div>
      <div className={styles.output}>
        <table>
          <tbody>
            <tr>
              <th>16進数</th>
              <td colSpan={3}>ffffff</td>
            </tr>
            <tr>
              <th>RGB</th>
              <td>255</td>
              <td>255</td>
              <td>255</td>
            </tr>
            <tr>
              <th>RGB パーセント</th>
              <td>1.0</td>
              <td>1.0</td>
              <td>1.0</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
