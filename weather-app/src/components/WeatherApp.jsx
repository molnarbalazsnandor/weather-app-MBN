import React, { useState } from "react";
import "./WeatherApp.css";
import {
  Box,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GeoDbAutocomplete from "./GeoDbAutocomplete";
import OpenWeather from "./OpenWeather";
import ForecastToday from "./ForecastToday";
import ForecastTwoHourly from "./ForecastTwoHourly";
import ForecastWeekly from "./ForecastWeekly";

function WeatherApp() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [weeklyForecast, setWeeklyForecast] = useState([]);
  const [error, setError] = useState(null);

  return (
    <Box className="weather-app">
      <GeoDbAutocomplete
        onCitySelect={(selectedOption) => setSelectedCity(selectedOption)}
      />{" "}
      {selectedCity && (
        <OpenWeather
          selectedCity={selectedCity}
          setError={setError}
          setWeather={setWeather}
          setHourlyForecast={setHourlyForecast}
          setWeeklyForecast={setWeeklyForecast}
        />
      )}
      {error && (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      )}
      {weather && (
        <ForecastToday className="forecast-today" weather={weather} />
      )}
      {hourlyForecast.length > 0 && (
        <ForecastTwoHourly
          className="forecast-two-hourly"
          hourlyForecast={hourlyForecast}
        />
      )}
      {weeklyForecast.length > 0 && (
        <ForecastWeekly
          className="forecast-weekly"
          weeklyForecast={weeklyForecast}
        />
      )}
    </Box>
  );
}

export default WeatherApp;
