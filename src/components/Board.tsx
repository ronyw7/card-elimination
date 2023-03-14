import React, { useState } from 'react';
import { Card } from './Card';

interface BoardProps {
  board: string[][],
  takeCard(rowId: number): void,
}

export function Board({ board, takeCard }: BoardProps) {
  const startingBoards = [
    [
      '131242',
      '412323',
      '142243',
      '443131',
    ]
  ]

  return (
    <div id='board'>
      {board.map((cardColors, index) => <Row cardColors={cardColors} takeCard={() => takeCard(index)} />)}
    </div>
  )
}

interface RowProps {
  cardColors: string[],
  takeCard(): void,
}

function Row({ cardColors, takeCard }: RowProps) {
  const createCards = (cardColors: string[]) => {
    const cards = [];

    for (let i = 0; i < cardColors.length - 1; i++) {
      cards.push(<Card color={cardColors[i]} />);
    }
    if (cardColors) {
      cards.push(<Card color={cardColors[cardColors.length - 1]} onClick={takeCard}/>);
    }

    return cards
  }

  return (
    <div className='row'>
      {createCards(cardColors)}
    </div>
  )
}