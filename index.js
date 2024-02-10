import React, { useEffect, useState } from 'react';

const GeorgeTimer = ({ initialTime }) => {
  const [timer, setTimer] = useState({ minutes: initialTime.minutes, seconds: initialTime.seconds, milliseconds: 0 });

  useEffect(() => {
    const startTime = new Date().getTime();
    const endTime = startTime + initialTime.minutes * 60 * 1000 + initialTime.seconds * 1000 + timer.milliseconds;

    const countdown = setInterval(() => {
      const currentTime = new Date().getTime();
      const timeDifference = endTime - currentTime;

      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
      const milliseconds = timeDifference % 1000;

      setTimer({ minutes, seconds, milliseconds });

      // Stop the countdown if reached zero
      if (timeDifference <= 0) {
        clearInterval(countdown);
        setTimer({ minutes: 0, seconds: 0, milliseconds: 0 });
      }
    }, 1); // Update every millisecond

    // Cleanup the interval on component unmount
    return () => clearInterval(countdown);
  }, [initialTime]);

  const formatNumber = (number) => (number < 10 ? `0${number}` : number);

  return (
    <div className="countdown-timer">
      <div className="timer">
        {`${formatNumber(timer.minutes)}:${formatNumber(timer.seconds)}:${formatNumber(timer.milliseconds)}`}
      </div>
    </div>
  );
};

export default GeorgeTimer;
