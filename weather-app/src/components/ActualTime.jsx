import React, { useState, useEffect } from "react";
import { useWeatherContext } from "./../WeatherContext";
import { Typography } from "@mui/material";
import { formatTime, formatTimeWithTimeZone } from "./FetchWeather";

const ActualTime = () => {
  const [actualTime, setActualTime] = useState(null);
  const { state } = useWeatherContext();

  useEffect(() => {
    const calculateTimeWithTimezone = () => {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const formattedTime = (
        state.timezone ? formatTimeWithTimeZone : formatTime
      )(currentTimestamp, state.timezone);

      setActualTime(formattedTime);
    };

    calculateTimeWithTimezone();

    const timerId = setInterval(calculateTimeWithTimezone, 5000);

    return () => {
      // Clean up the timer on component unmount
      clearInterval(timerId);
    };
  }, [state.timezone]);

  return (
    <Typography variant="h7">{actualTime ? actualTime : "N/A"}</Typography>
  );
};

export default ActualTime;
