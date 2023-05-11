import { useState, useRef, useCallback, useEffect } from 'react';
import { TimerHook } from './types';

export default function useTimer(): TimerHook {
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const startTimeRef = useRef<Date | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 開始計時
  const handleStartTimer = useCallback(() => {
    startTimeRef.current = new Date();
    setTimerRunning(true);
  }, []);

  // 結束計時
  const handleEndTimer = useCallback(() => {
    if (startTimeRef.current) {
      setTimerRunning(false);
    } else {
      console.warn('請先開始計時');
    }
  }, []);

  // 清除時間
  const handleCleanTimer = () => {
    setTimeElapsed(0);
    setTimerRunning(false);
  };

  useEffect(() => {
    if (timerRunning) {
      intervalRef.current = setInterval(() => {
        if (startTimeRef.current) {
          setTimeElapsed(new Date().getTime() - startTimeRef.current.getTime());
        }
      }, 1000); // 更新時間間隔，這裡設定為1秒
    } else {
      clearInterval(intervalRef.current as ReturnType<typeof setInterval>);
    }

    return () => {
      clearInterval(intervalRef.current as ReturnType<typeof setInterval>);
    };
  }, [timerRunning]);

  return { timeElapsed, handleStartTimer, handleEndTimer, handleCleanTimer };
}
