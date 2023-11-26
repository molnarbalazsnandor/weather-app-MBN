import React, { useState, useEffect } from "react";
import { useWeatherContext } from "./../WeatherContext";
import { Typography } from "@mui/material";
import { formatTimeWithTimeZone } from "./FetchWeather";

const ActualTime = () => {
  const [actualTime, setActualTime] = useState(null);
  const { state } = useWeatherContext();

  useEffect(() => {
    const calculateTimeWithTimezone = () => {
      if (state.timezone) {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const formattedTime = formatTimeWithTimeZone(
          currentTimestamp,
          state.timezone
        );

        setActualTime(formattedTime);
      }
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
