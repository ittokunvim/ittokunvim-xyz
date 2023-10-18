"use client";

import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-regular-svg-icons";

import { GameData } from "../lib";

import styles from './page.module.css';

function Button({ gameData, onButtonClick }: { gameData: GameData, onButtonClick: () => void }) {
  const { width, height } = gameData;

  return (
    <div className={styles.button} style={{ width, height }}>
      <button onClick={onButtonClick}>
        <FontAwesomeIcon icon={faCirclePlay} color="dodgerblue" />
        Run Game
      </button>
    </div>
  );
}

function Iframe({ gameData }: { gameData: GameData }) {
  const { name, width, height } = gameData;
  const gameSiteURL = process.env.NEXT_PUBLIC_GAMESITE_URL;
  const iframeURL = gameSiteURL + "/" + name;

  return <iframe src={iframeURL} width={width} height={height}></iframe>;
}


export default function Game({ gameData }: { gameData: GameData }) {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => setIsClicked(true);

  return (
    <div className={styles.game}>
      {!isClicked && <Button gameData={gameData} onButtonClick={() => handleClick()} />}
      {isClicked && <Iframe gameData={gameData} />}
    </div>
  );
}
