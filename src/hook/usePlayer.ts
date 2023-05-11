import { useState } from 'react';
import { PlayerHook } from './types';

export default function usePlayer(): PlayerHook {
  const [player, setPlayer] = useState('');

  const handlePlayerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayer(e.target.value);
  };

  return {
    player,
    handlePlayerNameChange,
  };
}
