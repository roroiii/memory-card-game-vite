interface GameTimerProps {
  showCongrats: boolean;
  timeElapsed: number;
}

export default function GameTimer({ showCongrats, timeElapsed }: GameTimerProps) {
  return (
    <div className={`${showCongrats ? '' : 'game-time-box'}`}>
      {showCongrats ? (
        <div className="game-time">總共花了 {Math.floor(timeElapsed / 1000)} 秒完成遊戲</div>
      ) : (
        <>{timeElapsed !== 0 && <div className="game-time">遊戲已經經過了{Math.floor(timeElapsed / 1000)} 秒</div>}</>
      )}
    </div>
  );
}
