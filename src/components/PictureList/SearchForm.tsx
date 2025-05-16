import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.css";

export type SearchData = {
  bonus: string;
  flag: string;
  album: string;
};

type Props = {
  searchPicture: (searchData: SearchData) => void;
};

export function SearchForm({ searchPicture }: Props) {
  const bonusList = [
    "",
    "BB",
    "RB",
    "HB",
    "CB",
  ];
  const albumList = [
    { en: "", ja: "" },
    { en: "hyper-rush", ja: "ハイパーラッシュ" },
    { en: "discup-ur", ja: "ディスクアップUR" }
  ];
  const [searchValue, setSearchValue] = useState<SearchData>({
    bonus: "",
    flag: "",
    album: "",
  });
  const [inputBonusValue, setInputBonusValue] = useState<string>("");
  const [inputFlagValue, setInputFlagValue] = useState<string>("");
  const [inputAlbumValue, setInputAlbumValue] = useState<string>("");
  const handleInputBonusChange = (value: string) => {
    setInputBonusValue(value);
    searchValue.bonus = value;
    setSearchValue(searchValue);
    searchPicture(searchValue);
  };
  const handleInputFlagChange = (value: string) => {
    value = value.replace(/[^0-9a-zA-Z ]/g, "");
    setInputFlagValue(value);
    searchValue.flag = value;
    setSearchValue(searchValue);
    searchPicture(searchValue);
  };
  const handleInputAlbumChange = (value: string) => {
    setInputAlbumValue(value);
    searchValue.album = value;
    setSearchValue(searchValue);
    searchPicture(searchValue);
  };

  return (
    <div className={styles.search}>
      <h4>
        <FontAwesomeIcon icon={faSearch} />
        検索する
      </h4>
      <div className={styles.form}>
        <div>
          <select
            value={inputBonusValue}
            onChange={(e) => handleInputBonusChange(e.target.value)}
          >
            <option value="" disabled>ボーナス</option>
            {bonusList.map((bonus, i) => (
              <option key={i} value={bonus}>{bonus}</option>
            ))}
          </select>
        </div>
        <div>
          <input
            type="text"
            value={inputFlagValue}
            placeholder="フラグ"
            onChange={(e) => handleInputFlagChange(e.target.value)}
          />
        </div>
        <div>
          <select
            value={inputAlbumValue}
            onChange={(e) => handleInputAlbumChange(e.target.value)}
          >
            <option value="" disabled>アルバム</option>
            {albumList.map((album, i) => (
              <option key={i} value={album.en}>{album.ja}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
