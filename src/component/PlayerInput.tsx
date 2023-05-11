import { PlayerHook } from '../hook/types';

export default function PlayerInput({ player, handlePlayerNameChange }: PlayerHook) {
  return (
    <div className="player-name-input">
      <label htmlFor="player-name">輸入比賽名稱：</label>
      <input type="text" id="player-name" placeholder="神秘人" value={player} onChange={handlePlayerNameChange} />
    </div>
  );
}
