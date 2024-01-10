import React, { useState } from "react";
import "./ForecastBasic.css";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import Icon from "./Icon";
import ActualTime from "./ActualTime";
import { useWeatherContext } from "./../WeatherContext";
import { formatTime } from "./FetchWeather";

function ForecastBasic({ weather }) {
  const { state } = useWeatherContext();

  const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);

  return (
    <Box className="forecast-basic">
      <Accordion className="weather-basic-accordion">
        <AccordionSummary
          className="weather-basic-accordion-summary"
          aria-controls="weather-basic-accordion"
          expanded={isAccordionExpanded ? "true" : undefined}
          onClick={() => setIsAccordionExpanded(!isAccordionExpanded)}
        >
          <Box className="accordion-summary-items">
            <Box className="accordion-summary-content">
              <Box className="left-content">
                <Typography variant="h5" sx={{ fontWeight: "800" }}>
                  {weather.name}, {weather.sys && weather.sys.country}
                </Typography>
                <Typography variant="h7">
                  Weather:{" "}
                  {weather.weather[0] ? weather.weather[0].main : "N/A"}
                </Typography>
              </Box>
              <Box className="right-content">
                <Typography sx={{ fontWeight: "800" }} variant="h5">
                  {weather.main.temp ? Math.round(weather.main.temp) : "N/A"}°C
                </Typography>
                <ActualTime />
              </Box>
            </Box>
            <ExpandMoreIcon
              style={{
                transform: isAccordionExpanded
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
                transition: "transform 0.2s ease",
              }}
            />
          </Box>
        </AccordionSummary>
        <AccordionDetails className="weather-basic-accordion-details">
          <Box className="details-content">
            <Box className="left-details">
              <Box className="accordion-details-box">
                <ThermostatIcon
                  className="accordion-details-icon"
                  sx={{ color: "#9399a2" }}
                />
                <Typography variant="body1">
                  Min. temp:{" "}
                  {weather.main.temp_min
                    ? Math.round(weather.main.temp_min)
                    : "N/A"}
                  °C
                </Typography>
              </Box>
              <Box className="accordion-details-box">
                <ThermostatIcon className="accordion-details-icon" />
                <Typography variant="body1">
                  Max. temp:{" "}
                  {weather.main.temp_max
                    ? Math.round(weather.main.temp_max)
                    : "N/A"}
                  °C
                </Typography>
              </Box>
            </Box>
            <Box className="right-details">
              <Box className="accordion-details-box">
                <Brightness4Icon className="accordion-details-icon" />
                <Typography variant="body1">
                  Sunset:{" "}
                  {state.sunsetTime ? formatTime(state.sunsetTime) : "N/A"}
                </Typography>
              </Box>
              <Box className="accordion-details-box">
                <WbTwilightIcon className="accordion-details-icon" />
                <Typography variant="body1">
                  Sunrise:{" "}
                  {state.sunriseTime ? formatTime(state.sunriseTime) : "N/A"}
                </Typography>
              </Box>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Box className="icon-box">
        <Icon
          style={{
            width: "100%",
            maxHeight: "20vh",
            minHeight: "120px",
            height: "auto",
          }}
          weather={weather}
        ></Icon>
      </Box>
    </Box>
  );
}

export default ForecastBasic;
