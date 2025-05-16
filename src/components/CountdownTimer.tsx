import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();
    
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNumber = (num: number): string => {
    return num < 10 ? `0${num}` : num.toString();
  };

  if (timeLeft.days <= 0 && timeLeft.hours <= 0 && timeLeft.minutes <= 0 && timeLeft.seconds <= 0) {
    return <div className="text-yellow-400 font-bold">Match Starting Soon!</div>;
  }

  return (
    <div className="flex justify-center space-x-2 text-sm">
      <div className="flex flex-col items-center">
        <div className="bg-gray-700 bg-opacity-50 rounded-md w-10 h-10 flex items-center justify-center text-lg font-bold">
          {formatNumber(timeLeft.days)}
        </div>
        <span className="text-xs text-gray-400 mt-1">Days</span>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="bg-gray-700 bg-opacity-50 rounded-md w-10 h-10 flex items-center justify-center text-lg font-bold">
          {formatNumber(timeLeft.hours)}
        </div>
        <span className="text-xs text-gray-400 mt-1">Hrs</span>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="bg-gray-700 bg-opacity-50 rounded-md w-10 h-10 flex items-center justify-center text-lg font-bold">
          {formatNumber(timeLeft.minutes)}
        </div>
        <span className="text-xs text-gray-400 mt-1">Mins</span>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="bg-gray-700 bg-opacity-50 rounded-md w-10 h-10 flex items-center justify-center text-lg font-bold">
          {formatNumber(timeLeft.seconds)}
        </div>
        <span className="text-xs text-gray-400 mt-1">Secs</span>
      </div>
    </div>
  );
};

export default CountdownTimer;