import { useState, useEffect, useCallback } from 'react';
import { HistoryHook } from './types';

export default function useHistory(): HistoryHook {
  const [gameHistory, setGameHistory] = useState<{ player: string; time: number }[]>(() => {
    const storedHistory = localStorage.getItem('gameHistory');
    return storedHistory ? JSON.parse(storedHistory) : [];
  });

  const handleAddHistory = useCallback((player: string, time: number) => {
    const newRecord = { player, time };
    setGameHistory((prev) => {
      const updatedHistory = [...prev, newRecord];
      localStorage.setItem('gameHistory', JSON.stringify(updatedHistory));
      return updatedHistory;
    });
  }, []);

  useEffect(() => {
    const storedHistory = localStorage.getItem('gameHistory');
    if (storedHistory) {
      setGameHistory(JSON.parse(storedHistory));
    }
  }, []);

  return {
    gameHistory,
    handleAddHistory,
  };
}
