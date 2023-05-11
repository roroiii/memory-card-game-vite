import { Flipper, Flipped } from 'react-flip-toolkit';
import { GameHook } from '../hook/types';

interface MemoryCardGameProps {
  cards: GameHook['cards'];
  openCards: GameHook['openCards'];
  matchedCards: GameHook['matchedCards'];
  handleClickOpen: GameHook['handleClickOpen'];
}

export default function MemoryCardGame({ cards, openCards, matchedCards, handleClickOpen }: MemoryCardGameProps) {
  return (
    <Flipper flipKey={openCards} className="memory-card-game">
      {cards.map((card, index) => (
        <Flipped key={card.id} flipId={card.id}>
          <div
            className={`card ${openCards.includes(index) || matchedCards.includes(index) ? 'flipped' : ''}`}
            onClick={() => handleClickOpen(index)}
          >
            <div className="card-face front" />
            <div className="card-face back">{card.content}</div>
          </div>
        </Flipped>
      ))}
    </Flipper>
  );
}
