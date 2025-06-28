import React, { useState, useEffect } from 'react';
import Card from './Card';

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secondDeg = (seconds / 60) * 360 + 90;
  const minuteDeg = (minutes / 60) * 360 + (seconds / 60) * 6 + 90;
  const hourDeg = ((hours % 12) / 12) * 360 + (minutes / 60) * 30 + 90;

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    };
    return date.toLocaleDateString('ko-KR', options);
  };
  
  const formatTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };
    return date.toLocaleTimeString('ko-KR', options);
  };

  const clockMarkers = Array.from({ length: 12 }, (_, i) => (
    <div 
      key={`marker-${i}`}
      className="absolute w-full h-full"
      style={{ transform: `rotate(${i * 30}deg)`}}
    >
      <div className={`absolute top-1 w-0.5 h-2.5 ${i % 3 === 0 ? 'bg-gray-700 w-1 h-4' : 'bg-gray-400'}`} style={{left: 'calc(50% - 1px)'}}></div>
    </div>
  ));

  return (
    <Card className="flex flex-col items-center justify-center gap-4">
      <div className="relative w-48 h-48">
        <div className="w-full h-full rounded-full bg-slate-200/50 border-4 border-slate-300/70 flex items-center justify-center">
          {clockMarkers}
          {/* Hour Hand */}
          <div 
            className="absolute w-1/3 h-1.5 bg-gray-800 rounded-full"
            style={{ transform: `rotate(${hourDeg}deg)`, transformOrigin: '0% 50%' , left: '50%' }}
          ></div>
          {/* Minute Hand */}
          <div 
            className="absolute w-2/5 h-1 bg-gray-600 rounded-full"
            style={{ transform: `rotate(${minuteDeg}deg)`, transformOrigin: '0% 50%', left: '50%' }}
          ></div>
          {/* Second Hand */}
          <div 
            className="absolute w-1/2 h-0.5 bg-indigo-500 rounded-full"
            style={{ transform: `rotate(${secondDeg}deg)`, transformOrigin: '0% 50%', left: '50%' }}
          ></div>
          {/* Center Dot */}
          <div className="absolute w-3 h-3 bg-gray-900 rounded-full"></div>
        </div>
      </div>
      <div className="text-center">
        <p className="text-2xl font-semibold tracking-wider text-gray-900">{formatTime(time)}</p>
        <p className="text-md text-gray-500">{formatDate(time)}</p>
      </div>
    </Card>
  );
};

export default Clock;