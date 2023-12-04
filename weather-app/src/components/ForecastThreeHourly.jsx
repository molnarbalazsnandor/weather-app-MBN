import React, { useState } from "react";
import "./ForecastThreeHourly.css";
import { Paper, Typography, Box } from "@mui/material";
import ThreeSixtyIcon from "@mui/icons-material/ThreeSixty";
import ReactCardFlip from "react-card-flip";
import Icon from "./Icon";
import { Navigation, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { useWeatherContext } from "./../WeatherContext";
import { formatTimeWithTimeZone } from "./FetchWeather";

function ForecastThreeHourly({ hourlyForecast }) {
  const { state } = useWeatherContext();

  const initialFlipState = new Array(hourlyForecast.length).fill(false);
  const [isFlipped, setIsFlipped] = useState(initialFlipState);

  const handleCardClick = (index) => {
    const updatedFlipState = [...isFlipped];
    updatedFlipState[index] = !updatedFlipState[index];
    setIsFlipped(updatedFlipState);
  };

  return (
    <Paper className="forecast-three-hourly">
      <Swiper
        className="swiper"
        modules={[Navigation, A11y]}
        spaceBetween={0}
        slidesPerView={5}
        navigation
        initialSlide={0}
      >
        {hourlyForecast.map((forecast, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <Box className="flip-card-wrapper">
              <ReactCardFlip
                className="flip-card"
                key={forecast.dt}
                isFlipped={isFlipped[index]}
                flipDirection="horizontal"
              >
                <Paper
                  className="flip-card front"
                  onClick={() => handleCardClick(index)}
                >
                  <Box className="three-sixty">
                    <ThreeSixtyIcon />
                  </Box>
                  <Box className="front-data"></Box>
                  <Typography variant="h6">
                    {formatTimeWithTimeZone(forecast.dt, state.timezone)}
                  </Typography>
                  <Icon
                    style={{ width: "5vw", height: "auto" }}
                    weather={forecast}
                  />
                  <Typography variant="h6">
                    {Math.round(forecast.main.temp)}°C
                  </Typography>
                </Paper>
                <Paper
                  className="flip-card back"
                  onClick={() => handleCardClick(index)}
                >
                  <Typography variant="body1">
                    Humidity:{" "}
                    {forecast.main.humidity
                      ? Math.round(forecast.main.humidity)
                      : "N/A"}
                    %
                  </Typography>
                  <Typography variant="body1">
                    Pressure:{" "}
                    {forecast.main.pressure
                      ? Math.round(forecast.main.pressure)
                      : "N/A"}{" "}
                    hPa
                  </Typography>
                  <Typography variant="body1">
                    Wind Speed:{" "}
                    {forecast.wind
                      ? `${(forecast.wind.speed * 3.6).toFixed(1)} km/h`
                      : "N/A"}
                  </Typography>
                  <ThreeSixtyIcon />
                </Paper>
              </ReactCardFlip>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Paper>
  );
}

export default ForecastThreeHourly;
