import { useEffect } from "react";
import {
  WEATHER_API_KEY,
  CURRENT_WEATHER_URL,
  HOURLY_WEATHER_URL,
} from "../api";
import { useWeatherContext } from "./../WeatherContext";

const fetchWeatherData = async (
  selectedCity,
  setError,
  setWeather,
  setHourlyForecast,
  setWeeklyForecast,
  dispatch
) => {
  if (!selectedCity) return;
  try {
    setError(null);

    // Fetch current weather data based on the selected city
    const currentWeatherResponse = await fetch(
      `${CURRENT_WEATHER_URL}?q=${selectedCity.label}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const currentWeatherData = await currentWeatherResponse.json();

    if (currentWeatherData) {
      setWeather(currentWeatherData);

      //Calculate current, sunset and sunrise times and set Context
      const currentTimestamp = Math.floor(
        (Date.now() + currentWeatherData.timezone * 1000) / 1000
      );
      const sunsetTimestamp =
        currentWeatherData.sys.sunset + currentWeatherData.timezone;
      const sunriseTimestamp =
        currentWeatherData.sys.sunrise + currentWeatherData.timezone;

      dispatch({
        type: "SET_CURRENT_TIME",
        payload: currentTimestamp,
      });

      dispatch({
        type: "SET_SUNSET_TIME",
        payload: sunsetTimestamp,
      });

      dispatch({
        type: "SET_SUNRISE_TIME",
        payload: sunriseTimestamp,
      });

      dispatch({
        type: "SET_TIMEZONE",
        payload: currentWeatherData.timezone,
      });

      // Fetch hourly weather forecast data based on the selected city
      const hourlyForecastResponse = await fetch(
        `${HOURLY_WEATHER_URL}?q=${selectedCity.label}&appid=${WEATHER_API_KEY}&units=metric`
      );
      const hourlyForecastData = await hourlyForecastResponse.json();

      if (hourlyForecastData.list) {
        setHourlyForecast(hourlyForecastData.list);

        // Fetch weekly weather forecast data based on the selected city
        const weeklyForecast = hourlyForecastData.list.filter((forecast) =>
          forecast.dt_txt.includes("12:00:00")
        ); // Assuming 12:00:00 represents the daily forecast
        setWeeklyForecast(weeklyForecast);

        // Log the data after successful fetch
        console.log(selectedCity.label);
        console.log("Weather Data:", currentWeatherData);
        console.log("Hourly Forecast Data:", hourlyForecastData.list);
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

// Format the UNIX time data in HH:mm format
export const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000);

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
    hour12: false,
  });
};

// Format the UNIX time data in HH:mm format, when the timezone is not already included
export const formatTimeWithTimeZone = (timestamp, timezone) => {
  const localTime = new Date(timestamp * 1000);
  const offset = localTime.getTimezoneOffset();
  const adjustedTime = new Date(
    localTime.getTime() + offset * 60 * 1000 + timezone * 1000
  );

  return adjustedTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const FetchWeather = ({
  selectedCity,
  setError,
  setWeather,
  setHourlyForecast,
  setWeeklyForecast,
  setLoadingSuggestions,
  setSuggestions,
}) => {
  const { dispatch } = useWeatherContext();

  useEffect(() => {
    fetchWeatherData(
      selectedCity,
      setError,
      setWeather,
      setHourlyForecast,
      setWeeklyForecast,
      dispatch
    );
  }, [selectedCity, dispatch]);

  return null;
};

export default FetchWeather;
