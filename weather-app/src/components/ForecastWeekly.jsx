import React from "react";
import "./ForecastWeekly.css";
import Icon from "./Icon";
import { Box, Typography, Paper } from "@mui/material";

function ForecastWeekly({ weeklyForecast }) {
  return (
    <Paper className="forecast-weekly">
      <Typography className="weekly-title" variant="h6">
        5-DAY FORECAST
      </Typography>
      <Box className="weekly-items">
        {weeklyForecast.slice(0, 5).map((forecast, i) => (
          <Box
            className={i === 4 ? "weekly-box last-box" : "weekly-box"}
            key={i}
          >
            <Typography variant="h6">
              {forecast.dayOfWeek.slice(0, 3)}
            </Typography>
            <Icon style={{ width: "5vw", height: "auto" }} weather={forecast} />
            <Typography>{forecast.weather[0].main}</Typography>
            <Typography>
              {forecast.temp_max ? Math.round(forecast.temp_max) : "N/A"}/
              {forecast.temp_min ? Math.round(forecast.temp_min) : "N/A"}°C
            </Typography>
            {/*             <Typography>
              Humidity:{" "}
              {forecast.humidity ? Math.round(forecast.humidity) : "N/A"}%
            </Typography>
            <Typography>
              Wind Speed:{" "}
              {forecast.wind_speed
                ? `${forecast.wind_speed.toFixed(1)} km/h`
                : "N/A"}
            </Typography> */}
          </Box>
        ))}
      </Box>
    </Paper>
  );
}

export default ForecastWeekly;
