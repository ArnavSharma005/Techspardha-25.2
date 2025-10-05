import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date('2025-10-15T00:00:00') - +new Date();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });
  const timerComponents = [];
  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval] && timeLeft[interval] !== 0) {
      return;
    }
    timerComponents.push(
      <div key={interval} className="flex flex-col items-center">
        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 flex items-center justify-center bg-amber-700 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105" style={{ perspective: '1000px' }}>
          <span key={timeLeft[interval]} className="text-4xl sm:text-5xl md:text-6xl text-white font-bold animate-popIn">
            {String(timeLeft[interval]).padStart(2, '0')}
          </span>
        </div>
        <span className="mt-3 text-sm sm:text-base text-orange-500 uppercase tracking-wider font-semibold">
          {interval}
        </span>
      </div>
    );
  });

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center p-4 font-sans">
        <style>{`
            @keyframes popIn {
                0% {
                    opacity: 0;
                    transform: scale(0.5) translateY(-50px);
                }
                100% {
                    opacity: 1;
                    transform: scale(1) translateY(0);
                }
            }
            .animate-popIn {
                animation: popIn 0.5s ease-out;
            }

            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fadeIn {
              animation: fadeIn 1s ease-out forwards;
            }
        `}</style>
        <div className="text-center animate-fadeIn">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 sm:mb-12 text-orange-500">
                TechSpardha Kicks Off In
            </h1>
            <div className="flex justify-center items-center space-x-3 sm:space-x-4 md:space-x-8">
            {timerComponents.length ? timerComponents : <span className="text-white text-2xl">Time's up!</span>}
            </div>
        </div>
    </div>
  );
};

export default CountdownTimer;

