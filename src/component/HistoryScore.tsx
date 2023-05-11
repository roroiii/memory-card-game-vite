import '../css/History.css';
import { HistoryHook } from '../hook/types';

export default function HistoryScore({ history }: { history: HistoryHook['gameHistory'] }) {
  const sortedHistory = history.sort((a, b) => a.time - b.time);

  return (
    <div className="history-board">
      <h2>比賽結果</h2>
      {sortedHistory && sortedHistory[0] && (
        <div className="first">
          <div>第 1 名</div>
          <div>{sortedHistory[0].time} 秒</div>
        </div>
      )}
      <ul>
        {sortedHistory.slice(0.3).map((record, index) => (
          <li className="li" key={index}>
            <p className="li-num">{index + 1}</p>
            <div className="li-name">
              <p>{record.player ? record.player : '神秘人'}</p> <p>{record.time} 秒</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
