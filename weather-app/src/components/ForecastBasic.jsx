import React, { useState } from "react";
import "./ForecastBasic.css";
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
import ActualTime from "./ActualTime";
import { useWeatherContext } from "./../WeatherContext";
import { formatTime } from "./FetchWeather";

function ForecastBasic({ weather }) {
  const { state } = useWeatherContext();

  return (
    <Box className="forecast-basic">
      <Accordion className="weather-basic-accordion">
        <AccordionSummary
          className="weather-basic-accordion-summary"
          aria-controls="weather-basic-accordion"
        >
          <Box className="accordion-summary-items">
            <Box className="accordion-summary-content">
              <Box className="left-content">
                <Typography variant="h5">
                  {weather.name}, {weather.sys && weather.sys.country}
                </Typography>
                <Typography variant="h7">
                  Weather:{" "}
                  {weather.weather[0] ? weather.weather[0].main : "N/A"}
                </Typography>
              </Box>
              <Box className="right-content">
                <Typography variant="h5">
                  {weather.main.temp ? Math.round(weather.main.temp) : "N/A"}°C
                </Typography>
                <ActualTime />
              </Box>
            </Box>
            <ExpandMoreIcon />
          </Box>
        </AccordionSummary>
        <AccordionDetails className="weather-basic-accordion-details">
          <Box className="details-content">
            <Box className="left-details">
              <Typography variant="body1">
                Min Temperature:{" "}
                {weather.main.temp_min
                  ? Math.round(weather.main.temp_min)
                  : "N/A"}
                °C
              </Typography>
              <Typography variant="body1">
                Max Temperature:{" "}
                {weather.main.temp_max
                  ? Math.round(weather.main.temp_max)
                  : "N/A"}
                °C
              </Typography>
            </Box>
            <Box className="right-details">
              <Typography variant="body1">
                Sunset time:{" "}
                {state.sunsetTime ? formatTime(state.sunsetTime) : "N/A"}
              </Typography>
              <Typography variant="body1">
                Sunrise time:{" "}
                {state.sunriseTime ? formatTime(state.sunriseTime) : "N/A"}
              </Typography>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Icon style={{ width: "30vw", height: "auto" }} weather={weather}></Icon>
    </Box>
  );
}

export default ForecastBasic;
