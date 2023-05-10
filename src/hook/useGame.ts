import { useState, useEffect, useCallback } from 'react';
import useTimer from './useTimer';
import useHistory from './useHistory';

interface IIsCoveredCard {
  openCards: number[];
  matchedCards: number[];
  index: number;
}

interface IIsStartTheGame {
  openCards: number[];
  matchedCards: number[];
  timeElapsed: number;
}

function generateCards() {
  const cardContents = [...Array(8).keys()].concat([...Array(8).keys()]); // 產生一組0到7的數字，然後將其複製並合併
  const shuffledCards = cardContents.sort(() => Math.random() - 0.5); // 隨機洗牌排列卡片

  return shuffledCards.map((content, index) => {
    return { id: index, content };
  });
}

// [Book] 重構：改善既有程式的設計 https://pjchender.dev/software-development/book-refactor/
function isCoveredCard({ openCards, matchedCards, index }: IIsCoveredCard): boolean {
  return openCards.length < 2 && !matchedCards.includes(index) && !openCards.includes(index);
}

function isStartTheGame({ openCards, matchedCards, timeElapsed }: IIsStartTheGame): boolean {
  return openCards.length === 0 && matchedCards.length === 0 && timeElapsed === 0;
}

export default function useGame() {
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
        setMatchedCards((prev) => [...prev, ...openCards]); // setMatchedCards((prev) => prev.concat(index))
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
