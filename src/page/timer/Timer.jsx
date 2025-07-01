import React, { useEffect, useState } from 'react';

function AnalogTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formattedTime = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl max-w-sm mx-auto my-12 border border-white/20">
      <div className="relative w-72 h-72 border-8 border-gray-900/80 rounded-full bg-white/50 flex items-center justify-center shadow-inner">
        {/* Clock face markings */}
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className={`absolute ${i % 5 === 0 ? 'w-1 h-4 bg-gray-800' : 'w-0.5 h-2 bg-gray-500'}`}
            style={{
              transform: `rotate(${i * 6}deg) translate(0, -130px)`,
            }}
          />
        ))}
        {/* Seconds hand */}
        <div
          className="absolute bottom-1/2 left-1/2 w-0.5 h-32 bg-red-600 origin-bottom transition-transform duration-1000 ease-linear"
          style={{ transform: `rotate(${(seconds % 60) * 6}deg)` }}
        />
        {/* Minutes hand */}
        <div
          className="absolute bottom-1/2 left-1/2 w-1 h-24 bg-gray-800 origin-bottom transition-transform duration-1000 ease-linear"
          style={{ transform: `rotate(${Math.floor(seconds / 60) * 6}deg)` }}
        />
        {/* Center dot */}
        <div className="absolute w-5 h-5 bg-gray-900 rounded-full z-10" />
      </div>

      <div className="mt-8 text-3xl font-bold text-gray-900 tracking-wide">
        {formattedTime}
      </div>

      <div className="mt-6 flex space-x-4">
        <button
          onClick={handleStart}
          disabled={isRunning}
          className={`px-6 py-3 rounded-lg font-semibold text-white transition-colors ${
            isRunning
              ? 'bg-green-400/50 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          Start
        </button>
        <button
          onClick={handleStop}
          disabled={!isRunning}
          className={`px-6 py-3 rounded-lg font-semibold text-white transition-colors ${
            !isRunning
              ? 'bg-red-400/50 cursor-not-allowed'
              : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          Stop
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-3 rounded-lg font-semibold text-white bg-gray-600 hover:bg-gray-700 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default AnalogTimer;