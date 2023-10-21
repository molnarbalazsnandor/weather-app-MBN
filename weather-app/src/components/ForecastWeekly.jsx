import React, { useState } from "react";
import "./ForecastWeekly.css";
import {
  Box,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Icon from "./Icon";

function ForecastWeekly({ weeklyForecast }) {
  return (
    <Paper className="forecast-weekly">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="weekly-forecast-content"
          id="weekly-forecast-header"
        >
          <Typography variant="h5">Weekly Forecast</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="weekly-forecast">
            <ul>
              {weeklyForecast.map((forecast) => (
                <li key={forecast.dt}>
                  Date: {new Date(forecast.dt * 1000).toLocaleDateString()},
                  Temperature: {Math.round(forecast.main.temp)}°C
                  <br />
                  Min Temperature:{" "}
                  {forecast.main.temp_min
                    ? Math.round(forecast.main.temp_min)
                    : "N/A"}
                  °C
                  <br />
                  Max Temperature:{" "}
                  {forecast.main.temp_max
                    ? Math.round(forecast.main.temp_max)
                    : "N/A"}
                  °C
                  <br />
                  Humidity:{" "}
                  {forecast.main.humidity
                    ? Math.round(forecast.main.humidity)
                    : "N/A"}
                  %
                  <br />
                  Pressure:{" "}
                  {forecast.main.pressure
                    ? Math.round(forecast.main.pressure)
                    : "N/A"}{" "}
                  hPa
                  <br />
                  Wind Speed:{" "}
                  {forecast.wind
                    ? `${(forecast.wind.speed * 3.6).toFixed(1)} km/h`
                    : "N/A"}
                </li>
              ))}
            </ul>
          </div>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
}

export default ForecastWeekly;
