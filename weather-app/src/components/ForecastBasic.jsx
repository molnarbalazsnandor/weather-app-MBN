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

function ForecastBasic({ weather }) {
  return (
    <Box className="forecast-basic">
      <div
        className="today-weather-basic"
        style={{
          width: "auto",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>
          <Typography variant="h5">
            {weather.name}, {weather.sys && weather.sys.country}
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h7">
            Temperature:{" "}
            {weather.main.temp ? Math.round(weather.main.temp) : "N/A"}
            °C
          </Typography>
          <Typography variant="h7">
            Weather: {weather.weather[0] ? weather.weather[0].main : "N/A"}
          </Typography>
        </div>
      </div>
      <Accordion className="today-weather">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="today-weather-content"
          id="today-weather-header"
        >
          <Typography variant="h6">Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="today-weather-details">
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
            <Typography variant="body1">
              Humidity:{" "}
              {weather.main.humidity
                ? Math.round(weather.main.humidity)
                : "N/A"}
              %
            </Typography>
            <Typography variant="body1">
              Pressure:{" "}
              {weather.main.pressure
                ? Math.round(weather.main.pressure)
                : "N/A"}{" "}
              hPa
            </Typography>
            <Typography variant="body1">
              Wind Speed:{" "}
              {weather.wind
                ? `${(weather.wind.speed * 3.6).toFixed(1)} km/h`
                : "N/A"}
            </Typography>
          </div>
        </AccordionDetails>
      </Accordion>
      <Icon weather={weather}></Icon>
    </Box>
  );
}

export default ForecastBasic;
