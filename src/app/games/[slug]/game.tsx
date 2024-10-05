"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-regular-svg-icons";

import { JsonData } from "../lib";
import styles from "./page.module.css";

const gameSiteURL = process.env.GAMESITE_URL;

function RunGameButton({ gameData, onButtonClick }: { gameData: JsonData; onButtonClick: () => void }) {
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

function GameIframe({ gameData }: { gameData: JsonData }) {
  const { slug, width, height } = gameData;
  const iframeURL = gameSiteURL + "/" + slug;

  return <iframe src={iframeURL} width={width} height={height}></iframe>;
}

export default function Game({ gameData }: { gameData: JsonData }) {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => setIsClicked(true);

  return (
    <>
      {!isClicked && <RunGameButton gameData={gameData} onButtonClick={() => handleClick()} />}
      <GameIframe gameData={gameData} />
    </>
  );
}
