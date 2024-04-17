import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import "../css/Game.css";

import { Board } from "../components/Board";
import { Hand, HandObject } from "../components/Hand";
import { EndPopup } from '../components/EndPopup';

import { layouts } from '../data/Layouts';

interface GameProps {
  addGameData(moveOrder: String, handLengths: number[]): void;
}

const colors = ['red', 'green', 'blue', 'yellow', 'violet', 'orange', 'cyan'];

export function GamePage({ addGameData }: GameProps) {
  const { layoutIndexStr } = useParams();
  
  const navigate = useNavigate();
  const location = useLocation();

  const layoutIndex = Number(layoutIndexStr);

  const params = new URLSearchParams(location.search);
  const currGameFromUrl = params.get('currGame');
  const currGame = Number(currGameFromUrl)


  const startingHand: HandObject = colors.reduce((obj, color) => ({ ...obj, [color]: 0 }), {});

  const processBoard = (board: string[]) => {
    return board.map((stack: string) => stack.split("").map(cardChar => colors[parseInt(cardChar) - 1]));
  }

  const [board, setBoard] = useState(processBoard(layouts[layoutIndex].board));
  const [hand, setHand] = useState(startingHand);
  const [moves, setMoves] = useState("");
  const [handLengths, setHandLengths] = useState<number[]>([]);
  const [gameEndPopup, setGameEndPopup] = useState(false);

  const takeCard = (rowId: number) => {
    const boardCopy = board.map(row => [...row]);
    if (0 <= rowId && rowId < board.length) {
      const newCard = boardCopy[rowId].pop();
      if (newCard) {
        const handCopy = {...hand};
        handCopy[newCard]++;

        if (handCopy[newCard] === layouts[layoutIndex].elimNum) {
          handCopy[newCard] = 0;
        }

        const newHandLengths = handLengths.concat([Object.keys(handCopy).reduce((total, key) => total + handCopy[key], 0)]);
        setHandLengths(newHandLengths);

        setHand(handCopy);
        setBoard(boardCopy);

        const newMoves = moves + rowId.toString();
        setMoves(newMoves);

        if (boardCopy.every(row => row.length === 0)) {
          setGameEndPopup(true);
          addGameData(newMoves, newHandLengths);
        }
      }
    }
  }

  useEffect(() => {
    if(gameEndPopup) {
      const gameEndData = {
        layout: layoutIndex,
        currGame: currGame,
        moves: moves,
        handLengths: handLengths,
        maxHandLength: handLengths.length === 0 ? 0 : Math.max(...handLengths)
      }
      console.log(gameEndData)
      window.parent.postMessage({
        type: 'gameArr' + currGameFromUrl,
        data: gameEndData
      }, '*');
    }
  }, [gameEndPopup]); 


  return (
    <div className='page'>
      <Board board={board} takeCard={takeCard} />
      <Hand hand={hand} maxHand={handLengths.length === 0 ? 0 : Math.max(...handLengths)} />
      {
        gameEndPopup ?
        (<EndPopup>
          <h1>Nice!</h1>
          {/* <h3>
            Move Order: {moves}<br />
            Hand Lengths: {handLengths}<br />
            Max Hand Used: {handLengths.length === 0 ? 0 : Math.max(...handLengths)}
          </h3> */}
          {/* <button id='next-layout' onClick={() => navigate('/')}>
            <p>
              Back to Start
            </p>
          </button> */}
          <h3>Thanks for playing! We have re-enabled the "next page" button, and you can now navigate to the next page.</h3>
        </EndPopup>) :
        null
      }
    </div>
  );
}
