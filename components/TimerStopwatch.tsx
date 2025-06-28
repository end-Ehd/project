import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';

type Mode = 'stopwatch' | 'timer';

const TimerStopwatch: React.FC = () => {
  const [mode, setMode] = useState<Mode>('stopwatch');
  const [time, setTime] = useState(0);
  
  const [timerHours, setTimerHours] = useState('0');
  const [timerMinutes, setTimerMinutes] = useState('10');
  const [timerSeconds, setTimerSeconds] = useState('0');

  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<number | null>(null);
  
  const getTimerTotalMs = () => {
    const hours = parseInt(timerHours, 10) || 0;
    const minutes = parseInt(timerMinutes, 10) || 0;
    const seconds = parseInt(timerSeconds, 10) || 0;
    return (hours * 3600 + minutes * 60 + seconds) * 1000;
  }

  useEffect(() => {
    if (isActive) {
      intervalRef.current = window.setInterval(() => {
        if (mode === 'stopwatch') {
          setTime(prev => prev + 10);
        } else {
          setTime(prev => {
            if (prev <= 10) {
              if (intervalRef.current) clearInterval(intervalRef.current);
              setIsActive(false);
              alert("타이머 종료!");
              return 0;
            }
            return prev - 10;
          });
        }
      }, 10);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, mode]);

  const handleStart = () => setIsActive(true);
  const handlePause = () => setIsActive(false);
  const handleReset = () => {
    setIsActive(false);
    if (mode === 'timer') {
      setTime(getTimerTotalMs());
    } else {
      setTime(0);
    }
  };

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    setIsActive(false);
    if (newMode === 'timer') {
      setTime(getTimerTotalMs());
    } else {
      setTime(0);
    }
  };
  
  const formatStopwatchTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  const formatTimerTime = (ms: number) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (mode === 'timer') {
      setTime(getTimerTotalMs());
    }
  }, [timerHours, timerMinutes, timerSeconds, mode]);


  return (
    <Card>
      <div className="flex justify-center mb-4 border-b-2 border-gray-200">
        <button onClick={() => handleModeChange('stopwatch')} className={`px-4 py-2 text-lg font-semibold w-1/2 transition ${mode === 'stopwatch' ? 'text-indigo-600 border-b-2 border-indigo-500' : 'text-gray-400 hover:text-gray-600'}`}>스톱워치</button>
        <button onClick={() => handleModeChange('timer')} className={`px-4 py-2 text-lg font-semibold w-1/2 transition ${mode === 'timer' ? 'text-indigo-600 border-b-2 border-indigo-500' : 'text-gray-400 hover:text-gray-600'}`}>타이머</button>
      </div>

      <div className="text-center my-4">
        <p className="text-5xl font-mono tracking-widest text-gray-900">
          {mode === 'timer' ? formatTimerTime(time) : formatStopwatchTime(time)}
        </p>
      </div>
      
      {mode === 'timer' && !isActive && (
        <div className="flex items-center justify-center gap-2 mb-4">
          <input type="number" value={timerHours} onChange={(e) => setTimerHours(e.target.value)} min="0" className="w-16 bg-slate-200 text-gray-900 text-center p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none border border-transparent focus:border-indigo-500"/>
          <span className="text-gray-600 font-bold">:</span>
          <input type="number" value={timerMinutes} onChange={(e) => setTimerMinutes(e.target.value)} min="0" max="59" className="w-16 bg-slate-200 text-gray-900 text-center p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none border border-transparent focus:border-indigo-500"/>
           <span className="text-gray-600 font-bold">:</span>
          <input type="number" value={timerSeconds} onChange={(e) => setTimerSeconds(e.target.value)} min="0" max="59" className="w-16 bg-slate-200 text-gray-900 text-center p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none border border-transparent focus:border-indigo-500"/>
        </div>
      )}

      <div className="flex justify-center gap-4">
        {!isActive ? (
          <button onClick={handleStart} className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg font-bold text-white transition">시작</button>
        ) : (
          <button onClick={handlePause} className="px-6 py-2 bg-amber-500 hover:bg-amber-600 rounded-lg font-bold text-white transition">정지</button>
        )}
        <button onClick={handleReset} className="px-6 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-bold text-white transition">리셋</button>
      </div>
    </Card>
  );
};

export default TimerStopwatch;