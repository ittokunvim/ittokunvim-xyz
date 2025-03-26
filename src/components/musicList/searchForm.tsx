import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import styles from "./style.module.css";

export type SearchData = {
  title: string;
  artist: string;
  createdAt: string;
};

type Prop = {
  searchMusic: (searchData: SearchData) => void;
};

export function SearchForm({ searchMusic }: Prop) {
  const searchValue: SearchData = {
    title: "",
    artist: "",
    createdAt: "",
  };
  const createdAtList = [
    "",
    "2022年7月",
    "2022年8月",
    "2022年9月",
    "2022年10月",
    "2022年11月",
    "2022年12月",
  ];
  const [inputTitleValue, setInputTitleValue] = useState<string>("");
  const [inputArtistValue, setInputArtistValue] = useState<string>("");
  const [inputCreatedAtValue, setInputCreatedAtValue] = useState<string>("");
  const handleInputTitleChange = (value: string) => {
    setInputTitleValue(value);
    searchValue.title = value;
    searchMusic(searchValue);
  };
  const handleInputArtistChange = (value: string) => {
    setInputArtistValue(value);
    searchValue.artist = value;
    searchMusic(searchValue);
  };
  const handleInputCreatedAtChange = (value: string) => {
    setInputCreatedAtValue(value);
    searchValue.createdAt = value;
    searchMusic(searchValue);
  };

  return (
    <div className={styles.search}>
      <h4>
        <FontAwesomeIcon icon={faSearch} />
        検索する
      </h4>
      <div className={styles.form}>
        <div>
          <input
            type="text"
            value={inputTitleValue}
            placeholder="タイトル"
            onChange={(e) => handleInputTitleChange(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            value={inputArtistValue}
            placeholder="アーティスト"
            onChange={(e) => handleInputArtistChange(e.target.value)}
          />
        </div>
        <div>
          <select
            value={inputCreatedAtValue}
            onChange={(e) => handleInputCreatedAtChange(e.target.value)}
          >
            <option value="" disabled>作成日時</option>
            {createdAtList.map((createdAt, i) => (
              <option key={i} value={createdAt}>{createdAt}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
