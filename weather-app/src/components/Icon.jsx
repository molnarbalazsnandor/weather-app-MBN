import React, { useState, useEffect } from "react";
import { useWeatherContext } from "./../WeatherContext";
import { formatTime, formatTimeWithTimeZone } from "./FetchWeather";

const weatherIconsDay = {
  "clear sky": require("./../pictures/icons/day/clear sky.svg").ReactComponent,
  "few clouds": require("./../pictures/icons/day/few clouds.svg")
    .ReactComponent,
  "scattered clouds": require("./../pictures/icons/day/scattered clouds.svg")
    .ReactComponent,
  "broken clouds": require("./../pictures/icons/day/scattered clouds.svg")
    .ReactComponent,
  "overcast clouds": require("./../pictures/icons/day/overcast clouds.svg")
    .ReactComponent,
  mist: require("./../pictures/icons/day/mist.svg").ReactComponent,
  fog: require("./../pictures/icons/day/mist.svg").ReactComponent,
  "light rain": require("./../pictures/icons/day/cloudy and rainy.svg")
    .ReactComponent,
  "light intensity drizzle rain":
    require("./../pictures/icons/day/cloudy and rainy.svg").ReactComponent,
  "light intensity shower rain":
    require("./../pictures/icons/day/cloudy and rainy.svg").ReactComponent,
  "shower rain": require("./../pictures/icons/day/cloudy and rainy.svg")
    .ReactComponent,
  "moderate rain": require("./../pictures/icons/day/cloudy and rainy.svg")
    .ReactComponent,
  showers: require("./../pictures/icons/day/cloudy and rainy.svg")
    .ReactComponent,
  "heavy rain": require("./../pictures/icons/day/rain.svg").ReactComponent,
  "light snow": require("./../pictures/icons/day/snow.svg").ReactComponent,
  "light shower snow": require("./../pictures/icons/day/snow.svg")
    .ReactComponent,
  "moderate snow": require("./../pictures/icons/day/snow.svg").ReactComponent,
  "heavy snow": require("./../pictures/icons/day/snow.svg").ReactComponent,
  thunderstorm: require("./../pictures/icons/day/thunder.svg").ReactComponent,
  "thunderstorm with rain":
    require("./../pictures/icons/day/thunderstorm with rain.svg")
      .ReactComponent,
};

const weatherIconsNight = {
  "clear sky": require("./../pictures/icons/night/clear sky.svg")
    .ReactComponent,
  "few clouds": require("./../pictures/icons/night/few clouds.svg")
    .ReactComponent,
  "scattered clouds": require("./../pictures/icons/night/scattered clouds.svg")
    .ReactComponent,
  "broken clouds": require("./../pictures/icons/night/scattered clouds.svg")
    .ReactComponent,
  "overcast clouds": require("./../pictures/icons/night/overcast clouds.svg")
    .ReactComponent,
  mist: require("./../pictures/icons/night/mist.svg").ReactComponent,
  fog: require("./../pictures/icons/night/mist.svg").ReactComponent,
  "light rain": require("./../pictures/icons/night/cloudy and rainy.svg")
    .ReactComponent,
  "light intensity drizzle rain":
    require("./../pictures/icons/night/cloudy and rainy.svg").ReactComponent,
  "light intensity shower rain":
    require("./../pictures/icons/night/cloudy and rainy.svg").ReactComponent,
  "shower rain": require("./../pictures/icons/night/cloudy and rainy.svg")
    .ReactComponent,
  "moderate rain": require("./../pictures/icons/night/cloudy and rainy.svg")
    .ReactComponent,
  showers: require("./../pictures/icons/night/cloudy and rainy.svg")
    .ReactComponent,
  "heavy rain": require("./../pictures/icons/night/rain.svg").ReactComponent,
  "light snow": require("./../pictures/icons/night/snow.svg").ReactComponent,
  "light shower snow": require("./../pictures/icons/night/snow.svg")
    .ReactComponent,
  "moderate snow": require("./../pictures/icons/night/snow.svg").ReactComponent,
  "heavy snow": require("./../pictures/icons/night/snow.svg").ReactComponent,
  thunderstorm: require("./../pictures/icons/night/thunder.svg").ReactComponent,
  "thunderstorm with rain":
    require("./../pictures/icons/night/thunderstorm with rain.svg")
      .ReactComponent,
};

const Icon = ({ weather, style }) => {
  const [isDay, setIsDay] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  const [sunsetTime, setSunsetTime] = useState("");
  const [sunriseTime, setSunriseTime] = useState("");

  const { state } = useWeatherContext();

  useEffect(() => {
    const currentTime = formatTimeWithTimeZone(weather.dt, state.timezone);
    const sunriseTime = formatTime(state.sunriseTime);
    const sunsetTime = formatTime(state.sunsetTime);

    // Compare the times in HH:mm format
    if (currentTime >= sunriseTime && currentTime <= sunsetTime) {
      setIsDay(true);
    } else {
      setIsDay(false);
    }
  }, [weather, state]);

  if (!weather) {
    return null;
  }

  if (!weather) {
    return null;
  }

  const weatherIcons = isDay ? weatherIconsDay : weatherIconsNight;
  const WeatherIconComponent =
    weatherIcons[weather.weather[0].description.toLowerCase()];

  if (WeatherIconComponent) {
    return <WeatherIconComponent style={style} />;
  } else {
    return null;
  }
};

export default Icon;
