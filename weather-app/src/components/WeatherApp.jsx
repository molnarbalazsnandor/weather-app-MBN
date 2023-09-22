import React, { useState, useEffect } from "react";
import {
  TextField,
  Typography,
  Paper,
  Autocomplete,
  CircularProgress,
} from "@mui/material";

const API_KEY = "d163b4fb3ccea3df7eff1ce2046ec130";
const API_URL = `https://api.openweathermap.org/data/2.5/weather`;
const SUGGESTION_API_URL = `https://api.openweathermap.org/data/2.5/find`;

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (city) {
      fetchWeather();
    }
  }, [city]);

  const fetchWeather = async () => {
    try {
      setError(null);
      const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}`);
      const data = await response.json();
      if (data.main) {
        setWeather(data);
      } else {
        setError("Weather data not found");
      }
    } catch (error) {
      setError("Error fetching weather");
      console.error("Error fetching weather:", error);
    }
  };

  const fetchSuggestions = async (inputValue) => {
    try {
      setLoadingSuggestions(true);
      const response = await fetch(
        `${SUGGESTION_API_URL}?q=${inputValue}&appid=${API_KEY}`
      );
      const data = await response.json();
      if (data.list) {
        const cityNames = data.list.map((item) => item.name);
        setSuggestions(cityNames.slice(0, 5)); // Limit to the first 5 suggestions
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      setSuggestions([]);
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  return (
    <Paper
      elevation={3}
      style={{ padding: "16px", maxWidth: "400px", margin: "0 auto" }}
    >
      <Typography variant="h4" gutterBottom>
        Weather App
      </Typography>
      <Autocomplete
        id="city-autocomplete"
        options={suggestions}
        loading={loadingSuggestions}
        onInputChange={(event, newInputValue) => {
          setCity(newInputValue);
          if (newInputValue) {
            fetchSuggestions(newInputValue);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Enter city name"
            variant="outlined"
            fullWidth
            value={city}
            onChange={(e) => setCity(e.target.value)}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loadingSuggestions ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
      {error && (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      )}
      {weather && (
        <div>
          <Typography variant="h5">
            {weather.name}, {weather.sys && weather.sys.country}
          </Typography>
          <Typography variant="body1">
            Temperature:{" "}
            {weather.main.temp ? Math.round(weather.main.temp - 273.15) : "N/A"}
            °C
          </Typography>
          <Typography variant="body1">
            Weather: {weather.weather[0] ? weather.weather[0].main : "N/A"}
          </Typography>
        </div>
      )}
    </Paper>
  );
}

export default WeatherApp;
