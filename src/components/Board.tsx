import { Card } from './Card';
import { Timer } from './Timer';
import { getRandInt } from '../data/Layouts';

interface BoardProps {
  board: string[][],
  costs: number[][],
  takeCard(rowId: number): void,
}


export function Board({ board, costs, takeCard }: BoardProps) {
  return (
    <div id='board'>
      {board.map((cardColors, index) => <Row key={index} cardColors={cardColors} cardCosts={costs[index]} takeCard={() => takeCard(index)} />)}
      {/* <Timer /> */}
    </div>
  )
}

interface RowProps {
  cardColors: string[],
  cardCosts: number[],
  takeCard(): void,
}

function Row({ cardColors, cardCosts, takeCard }: RowProps) {
  const createCards = (cardColors: string[], cardCosts: number[]) => {
    const cards = [];

    for (let i = 0; i < cardColors.length - 1; i++) {
      cards.push(
        <Card
          className="stack"
          key={cards.length}
          index={cards.length}
          color={cardColors[i]}
          cost={cardCosts[i]}
        />
      );
    }
    if (cardColors.length !== 0) {
      cards.push(
        <Card
          className="stack last-card"
          key={cards.length}
          index={cards.length}
          color={cardColors[cardColors.length - 1]}
          cost={cardCosts[cardColors.length - 1]}
          onClick={takeCard}
        />
      );
    } else {
      cards.push(
        <Card
          className="stack"
          key={cards.length}
          index={cards.length}
          cost={cardCosts[cardColors.length - 1]}
        />
      );
    }

    return cards
  }

  return (
    <div className='row'>
      {createCards(cardColors, cardCosts)}
    </div>
  )
}
