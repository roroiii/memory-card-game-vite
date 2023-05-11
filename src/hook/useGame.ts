import { useState, useEffect, useCallback } from 'react';
import { generateCards, isCoveredCard, isStartTheGame } from '../utils/games';
import useTimer from './useTimer';
import useHistory from './useHistory';
import { GameHook } from './types';

export default function useGame(): GameHook {
  const { timeElapsed, handleStartTimer, handleEndTimer, handleCleanTimer } = useTimer();
  const { gameHistory, handleAddHistory } = useHistory();
  const [cards, setCards] = useState(generateCards());
  const [openCards, setOpenCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [showCongrats, setShowCongrats] = useState(false);
  const [player, setPlayer] = useState('');

  const handlePlayerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayer(e.target.value);
  };

  const handleClickResetGame = () => {
    setShowCongrats(false);
    setOpenCards([]);
    setMatchedCards([]);
    handleEndTimer();
    handleCleanTimer();
    setPlayer('');
    setTimeout(() => {
      setCards(generateCards());
    }, 500);
  };

  const handleClickOpen = (index: number) => {
    // https://pjchender.dev/software-development/book-refactor
    if (isCoveredCard({ openCards, matchedCards, index })) {
      setOpenCards((prev) => [...prev, index]);

      if (isStartTheGame({ openCards, matchedCards, timeElapsed })) {
        handleStartTimer();
      }
    }
  };

  const handleCheckMatchingCards = useCallback(
    (openCards: number[]) => {
      const [firstCard, secondCard] = openCards;
      if (cards[firstCard].content === cards[secondCard].content) {
        setMatchedCards((prev) => [...prev, ...openCards]);
        setOpenCards([]);
      } else {
        setTimeout(() => {
          setOpenCards([]);
        }, 500);
      }
    },
    [cards]
  );

  useEffect(() => {
    if (openCards.length === 2) {
      handleCheckMatchingCards(openCards);
    }
  }, [handleCheckMatchingCards, openCards]);

  useEffect(() => {
    if (matchedCards.length === 16) {
      setShowCongrats(true); // 完成遊戲
      handleEndTimer();
      handleAddHistory(player, Math.floor(timeElapsed / 1000)); // 新增歷史紀錄
    }
  }, [matchedCards, setShowCongrats, handleAddHistory, handleEndTimer, player, timeElapsed]);

  return {
    cards,
    openCards,
    matchedCards,
    showCongrats,

    timeElapsed,
    gameHistory,
    player,
    handlePlayerNameChange,
    handleClickResetGame,
    handleClickOpen,
  };
}
