import React, { createContext, useContext, useReducer } from "react";

const WeatherContext = createContext();

const weatherReducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_TIME":
      return { ...state, currentTime: action.payload };
    case "SET_SUNSET_TIME":
      return { ...state, sunsetTime: action.payload };
    case "SET_SUNRISE_TIME":
      return { ...state, sunriseTime: action.payload };
    case "SET_TIMEZONE":
      return { ...state, timezone: action.payload };
    default:
      return state;
  }
};

const WeatherProvider = ({ children }) => {
  const [state, dispatch] = useReducer(weatherReducer, {
    currentTime: null,
    sunsetTime: null,
    sunriseTime: null,
    timezone: null,
  });

  return (
    <WeatherContext.Provider value={{ state, dispatch }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherContext = () => {
  return useContext(WeatherContext);
};

export default WeatherProvider;
