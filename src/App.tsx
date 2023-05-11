import Celebration from './component/Celebration';
import HistoryScore from './component/HistoryScore';
import PlayerInput from './component/PlayerInput';
import GameTimer from './component/GameTimer';
import MemoryCardGame from './component/MemoryCardGame';
import useGame from './hook/useGame';
import './css/App.css';
import GameTitle from './component/GameTitle';

export default function App() {
  const {
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
  } = useGame();

  return (
    <div className="memory-box">
      <GameTitle />
      {showCongrats ? (
        <>{player ? player : '神秘人'}</>
      ) : (
        <PlayerInput player={player} handlePlayerNameChange={handlePlayerNameChange} />
      )}
      <GameTimer showCongrats={showCongrats} timeElapsed={timeElapsed} />
      <MemoryCardGame
        cards={cards}
        openCards={openCards}
        matchedCards={matchedCards}
        handleClickOpen={handleClickOpen}
      />

      {showCongrats && <Celebration handleClickResetGame={handleClickResetGame} />}
      <HistoryScore history={gameHistory} />
    </div>
  );
}
