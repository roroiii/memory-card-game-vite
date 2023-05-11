import { IIsCoveredCard, IIsStartTheGame } from './types';

export function generateCards() {
  const cardContents = [...Array(8).keys()].concat([...Array(8).keys()]); // 產生一組0到7的數字，然後將其複製並合併
  const shuffledCards = cardContents.sort(() => Math.random() - 0.5); // 隨機洗牌排列卡片

  return shuffledCards.map((content, index) => {
    return { id: index, content };
  });
}

export function isCoveredCard({ openCards, matchedCards, index }: IIsCoveredCard): boolean {
  return openCards.length < 2 && !matchedCards.includes(index) && !openCards.includes(index);
}

export function isStartTheGame({ openCards, matchedCards, timeElapsed }: IIsStartTheGame): boolean {
  return openCards.length === 0 && matchedCards.length === 0 && timeElapsed === 0;
}
