import React, { useState, useEffect, useCallback } from "react";
import { useWeatherContext } from "./../WeatherContext";
import { formatTime, formatTimeWithTimeZone } from "./FetchWeather";
import Particles from "react-tsparticles";
import dayRainConfig from "./particles config/dayRainConfig";
import nightRainConfig from "./particles config/nightRainConfig";
import dayPolygonConfig from "./particles config/dayPolygonConfig";
import nightPolygonConfig from "./particles config/nightPolygonConfig";
import daySnowConfig from "./particles config/daySnowConfig";
import nightSnowConfig from "./particles config/nightSnowConfig";

const ParticlesBackground = ({ weather }) => {
  const particlesInit = useCallback((engine) => {}, []);

  const particlesLoaded = useCallback((container) => {}, []);

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

  let selectedConfig;

  if (weather.weather[0].main.toLowerCase() === "rain") {
    selectedConfig = isDay ? dayRainConfig : nightRainConfig;
  } else if (weather.weather[0].main.toLowerCase() === "snow") {
    selectedConfig = isDay ? daySnowConfig : nightSnowConfig;
  } else {
    selectedConfig = isDay ? dayPolygonConfig : nightPolygonConfig;
  }

  return (
    <Particles
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: "0",
        left: "0",
      }}
      params={selectedConfig}
      init={particlesInit}
      loaded={particlesLoaded}
    />
  );
};

export default ParticlesBackground;
