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
import Icon from "./Icon";

function WeatherApp() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [weeklyForecast, setWeeklyForecast] = useState([]);
  const [error, setError] = useState(null);
  const [test, setTest] = useState("cloudy");

  return (
    <Box className="weather-app">
      <Paper
        elevation={3}
        style={{
          padding: "16px",
          width: "40vw",
          margin: "0 auto",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Weather App
        </Typography>
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
        <Icon
          iconName={weather ? weather.weather[0].main.toLowerCase() : "N/A"}
          style={{ width: "40vw", height: "40vh" }}
        ></Icon>
        {weather && (
          <Accordion className="today-weather">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="today-weather-content"
              id="today-weather-header"
            >
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
                    Weather:{" "}
                    {weather.weather[0] ? weather.weather[0].main : "N/A"}
                  </Typography>
                </div>
              </div>
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
        )}
        {hourlyForecast.length > 0 && (
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
        )}
        {weeklyForecast.length > 0 && (
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
        )}
      </Paper>
    </Box>
  );
}

export default WeatherApp;
