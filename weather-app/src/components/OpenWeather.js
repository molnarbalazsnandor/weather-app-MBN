import { useEffect } from "react";
import {
  WEATHER_API_KEY,
  CURRENT_WEATHER_URL,
  HOURLY_WEATHER_URL,
} from "../api";

const fetchWeather = async (
  selectedCity,
  setError,
  setWeather,
  setHourlyForecast,
  setWeeklyForecast
) => {
  if (!selectedCity) return;
  try {
    setError(null);

    // Calculate the next full hour
    const currentDate = new Date();
    currentDate.setMinutes(0);
    currentDate.setSeconds(0);
    const nextFullHour = currentDate.getHours();

    // Fetch current weather data based on the selected city
    const currentWeatherResponse = await fetch(
      `${CURRENT_WEATHER_URL}?q=${selectedCity.label}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const currentWeatherData = await currentWeatherResponse.json();

    if (currentWeatherData.main) {
      setWeather(currentWeatherData);

      // Fetch hourly weather forecast data based on the selected city
      const hourlyForecastResponse = await fetch(
        `${HOURLY_WEATHER_URL}?q=${selectedCity.label}&appid=${WEATHER_API_KEY}&units=metric`
      );
      const hourlyForecastData = await hourlyForecastResponse.json();

      if (hourlyForecastData.list) {
        // Filter hourly data starting from the next full hour
        const filteredHourlyForecast = hourlyForecastData.list.filter(
          (forecast) => {
            const forecastDate = new Date(forecast.dt * 1000);
            const forecastHour = forecastDate.getHours();
            return forecastHour >= nextFullHour;
          }
        );

        setHourlyForecast(filteredHourlyForecast);

        // Fetch weekly weather forecast data based on the selected city
        const weeklyForecast = hourlyForecastData.list.filter((forecast) =>
          forecast.dt_txt.includes("12:00:00")
        ); // Assuming 12:00:00 represents the daily forecast
        setWeeklyForecast(weeklyForecast);

        // Log the data after successful fetch
        console.log(selectedCity.label);
        console.log("Weather Data:", currentWeatherData);
        console.log("Hourly Forecast Data:", filteredHourlyForecast);
        console.log("Weekly Forecast Data:", weeklyForecast);
      } else {
        setError("Hourly forecast data not found");
      }
    } else {
      setError("Weather data not found");
    }
  } catch (error) {
    setError("Error fetching weather");
    console.error("Error fetching weather:", error);
  }
};

const OpenWeather = ({
  selectedCity,
  setError,
  setWeather,
  setHourlyForecast,
  setWeeklyForecast,
  setLoadingSuggestions,
  setSuggestions,
}) => {
  useEffect(() => {
    fetchWeather(
      selectedCity,
      setError,
      setWeather,
      setHourlyForecast,
      setWeeklyForecast
    );
  }, [selectedCity]);

  return null;
};

export default OpenWeather;
