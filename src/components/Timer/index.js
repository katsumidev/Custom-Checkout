import React, { useState, useEffect } from "react";
import { Container } from "./styles";
import { RiAlarmWarningFill } from "react-icons/ri";

const Timer = ({ text, time }) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => {
          if (seconds > 0) {
            return seconds - 1;
          }
          setIsActive(false);
          return 0;
        });
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  useEffect(() => {
    setSeconds(timeToSeconds(time)); // 5 minutos em segundos
    setIsActive(true);
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  function timeToSeconds(time) {
    const [minutes, seconds] = time.split(":").map((str) => parseInt(str, 10));
    const totalSeconds = minutes * 60 + seconds;
    return totalSeconds;
  }

  return (
    <Container>
      <RiAlarmWarningFill />
      {text} <h2>{formatTime(seconds)}</h2>
    </Container>
  );
};

export default Timer;
