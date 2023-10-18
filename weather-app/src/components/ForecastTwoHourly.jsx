import React, { useState } from "react";
import "./ForecastToday.css";
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

function ForecastTwoHourly({ hourlyForecast }) {
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="hourly-forecast-content"
          id="hourly-forecast-header"
        >
          <Typography variant="h5">2-Hourly Forecast Today</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="hourly-forecast">
            <ul>
              {hourlyForecast.map((forecast) => (
                <li key={forecast.dt}>
                  Time: {new Date(forecast.dt * 1000).toLocaleTimeString()},
                  Temperature: {Math.round(forecast.main.temp)}°C
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
    </>
  );
}

export default ForecastTwoHourly;
