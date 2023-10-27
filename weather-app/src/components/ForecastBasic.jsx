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

function ForecastBasic({
  weather,
  sunsetTime,
  setSunsetTime,
  sunriseTime,
  setSunriseTime,
}) {
  return (
    <Box className="forecast-basic">
      <Accordion className="weather-basic-accordion">
        <AccordionSummary
          className="weather-basic-accordion-summary"
          expandIcon={<ExpandMoreIcon />}
          aria-controls="weather-basic-accordion"
        >
          <div className="left-content">
            <Typography variant="h5">
              {weather.name}, {weather.sys && weather.sys.country}
            </Typography>
            <Typography variant="h7">
              Weather: {weather.weather[0] ? weather.weather[0].main : "N/A"}
            </Typography>
          </div>
          <div className="right-content">
            <Typography variant="h5">
              {weather.main.temp ? Math.round(weather.main.temp) : "N/A"}°C
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className="weather-basic-accordion-details">
          <div className="details-content">
            <div className="left-details">
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
            </div>
            <div className="right-details">
              <Typography variant="body1">
                Sunset time: {sunsetTime ? sunsetTime : "N/A"}
              </Typography>
              <Typography variant="body1">
                Sunrise time: {sunriseTime ? sunriseTime : "N/A"}
              </Typography>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>

      <Icon
        style={{ width: "30vw", height: "auto" }}
        weather={weather}
        timezone={weather.timezone}
        sunsetTime={sunsetTime}
        setSunsetTime={setSunsetTime}
        sunriseTime={sunriseTime}
        setSunriseTime={setSunriseTime}
      ></Icon>
    </Box>
  );
}

export default ForecastBasic;
