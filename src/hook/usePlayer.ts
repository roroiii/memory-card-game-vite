import { useState } from 'react';

export default function usePlayer() {
  const [player, setPlayer] = useState('');

  const handlePlayerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayer(e.target.value);
  };

  return {
    player,
    handlePlayerNameChange,
  };
}
