import React, { useEffect, useState, useRef } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, TextField } from '@mui/material';
// import { requestNotificationPermission } from '../../../src/firebase'


function AnalogTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [targetMinutes, setTargetMinutes] = useState(15);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [streakMinutes, setStreakMinutes] = useState('');
  const [taskName, setTaskName] = useState('');

  const [showStreakInput, setShowStreakInput] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
    
    if (seconds >= targetMinutes * 60 && isRunning) {
      setIsRunning(false);
      setShowSuccess(true);
      setShowPrompt(true);
      notifyUser();
      playSound();
    }

    return () => clearInterval(interval);
  }, [isRunning, seconds]);
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isRunning) {
        // Pause timer and show alert when user leaves the tab
        setIsRunning(false);
        alert("🚨 You left the tab while the timer was running. Timer paused.");
      }
    };
    

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isRunning]);


  const notifyUser = () => {
    if (Notification.permission === 'granted') {
      new Notification('⏰ Time is up!', {
        body: `You reached your ${targetMinutes}-minute goal! 🎉`,
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('⏰ Time is up!', {
            body: `You reached your ${targetMinutes}-minute goal! 🎉`,
          });
        }
      });
    }
  };

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.volume = 1; // max volume
      audioRef.current.currentTime = 0; // restart from beginning
      audioRef.current
        .play()
        .then(() => {
          console.log("Sound played successfully");
        })
        .catch((err) => {
          console.error("Autoplay blocked or other error:", err);
        });
    }
  };
  ;

  const formattedTime = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  const handleContinueClick = () => {
    setShowStreakInput(true); // show input field
  };

  const handleStreakSubmit = () => {
    const minutes = parseInt(streakMinutes);
    if (!isNaN(minutes) && minutes > 0 && taskName.trim() !== '') {
      setTargetMinutes(minutes);
      setSeconds(0);
      setIsRunning(true);
      setShowPrompt(false);
      setShowStreakInput(false);
      setStreakMinutes('');
      console.log(`✅ New Task: ${taskName}, Duration: ${minutes} mins`);
      setTaskName('');
    }
  };


  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl max-w-sm mx-auto my-12 border border-white/20">
      <audio ref={audioRef} src="/sounds/success.mp3" preload="auto" /> {/* Local file in /public/sounds/ */}
      {/* OR use this for online version: */}
      {/* <audio ref={audioRef} src="https://www.soundjay.com/button/sounds/button-3.mp3" preload="auto" /> */}

      <div className="mb-4">
        <TextField
          type="number"
          label="Set minutes"
          variant="outlined"
          value={targetMinutes}
          onChange={(e) => setTargetMinutes(Number(e.target.value))}
          size="small"
        />
      </div>

      {/* Analog Clock UI */}
      <div className="relative w-72 h-72 border-8 border-gray-900/80 rounded-full bg-white/50 flex items-center justify-center shadow-inner">
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className={`absolute ${i % 5 === 0 ? 'w-1 h-4 bg-gray-800' : 'w-0.5 h-2 bg-gray-500'}`}
            style={{
              transform: `rotate(${i * 6}deg) translate(0, -130px)`,
            }}
          />
        ))}
        <div
          className="absolute bottom-1/2 left-1/2 w-0.5 h-32 bg-red-600 origin-bottom transition-transform duration-1000 ease-linear"
          style={{ transform: `rotate(${(seconds % 60) * 6}deg)` }}
        />
        <div
          className="absolute bottom-1/2 left-1/2 w-1 h-24 bg-gray-800 origin-bottom transition-transform duration-1000 ease-linear"
          style={{ transform: `rotate(${Math.floor(seconds / 60) * 6}deg)` }}
        />
        <div className="absolute w-5 h-5 bg-gray-900 rounded-full z-10" />
      </div>

      <div className="mt-8 text-3xl font-bold text-gray-900 tracking-wide">
        {formattedTime}
      </div>

      <div className="mt-6 flex space-x-4">
        <Button onClick={handleStart} disabled={isRunning} variant="contained" color="success">Start</Button>
        <Button onClick={handleStop} disabled={!isRunning} variant="contained" color="error">Stop</Button>
        <Button onClick={handleReset} variant="contained" color="primary">Reset</Button>
      </div>

      {/* Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        message={`🎉 You completed ${targetMinutes} mins!`}
      />

      {/* Dialog */}
      <Dialog open={showPrompt} onClose={() => setShowPrompt(false)}>
        <DialogTitle>Great Job! 🎉</DialogTitle>
        <DialogContent>
          {!showStreakInput ? (
            <div>Do you want to continue your streak?</div>
          ) : (
            <>
              <TextField
                autoFocus
                label="Task Name"
                fullWidth
                margin="dense"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
              <TextField
                type="number"
                label="Next streak (minutes)"
                fullWidth
                margin="dense"
                value={streakMinutes}
                onChange={(e) => setStreakMinutes(e.target.value)}
              />
            </>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setShowPrompt(false)}>No</Button>
          {!showStreakInput ? (
            <Button onClick={handleContinueClick} autoFocus>Yes</Button>
          ) : (
            <Button onClick={handleStreakSubmit} autoFocus>Start</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AnalogTimer;
