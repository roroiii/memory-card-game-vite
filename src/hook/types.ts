export interface PlayerHook {
  player: string;
  handlePlayerNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface TimerHook {
  timeElapsed: number;
  handleStartTimer: () => void;
  handleEndTimer: () => void;
  handleCleanTimer: () => void;
}

export interface HistoryHook {
  gameHistory: { player: string; time: number }[];
  handleAddHistory: (player: string, time: number) => void;
}

export interface GameHook {
  cards: { id: number; content: number }[];
  openCards: number[];
  matchedCards: number[];
  showCongrats: boolean;
  timeElapsed: TimerHook['timeElapsed'];
  gameHistory: HistoryHook['gameHistory'];
  player: PlayerHook['player'];
  handlePlayerNameChange: PlayerHook['handlePlayerNameChange'];
  handleClickResetGame: () => void;
  handleClickOpen: (index: number) => void;
}
