import React from "react";
import "./ForecastWeekly.css";
import Icon from "./Icon";
import { Box, Typography, Paper } from "@mui/material";

function ForecastWeekly({ weeklyForecast }) {
  return (
    <Paper className="forecast-weekly">
      <Box display="flex" flexDirection="column" alignItems="center">
        {weeklyForecast.map((forecast) => (
          <Box
            key={forecast.dt}
            p={2}
            m={2}
            border={1}
            borderRadius={2}
            textAlign="center"
          >
            <Typography variant="h6">{forecast.dayOfWeek}</Typography>
            <Icon style={{ width: "5vw", height: "auto" }} weather={forecast} />
            <Typography>
              Min Temperature:{" "}
              {forecast.temp_min ? Math.round(forecast.temp_min) : "N/A"}°C
            </Typography>
            <Typography>
              Max Temperature:{" "}
              {forecast.temp_max ? Math.round(forecast.temp_max) : "N/A"}°C
            </Typography>
            <Typography>
              Humidity:{" "}
              {forecast.humidity ? Math.round(forecast.humidity) : "N/A"}%
            </Typography>
            <Typography>
              Wind Speed:{" "}
              {forecast.wind_speed
                ? `${forecast.wind_speed.toFixed(1)} km/h`
                : "N/A"}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}

export default ForecastWeekly;
