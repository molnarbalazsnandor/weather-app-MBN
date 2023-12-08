import React, { useState } from "react";
import "./ForecastThreeHourly.css";
import { Paper, Typography, Box } from "@mui/material";
import ThreeSixtyIcon from "@mui/icons-material/ThreeSixty";
import AirIcon from "@mui/icons-material/Air";
import OpacityIcon from "@mui/icons-material/Opacity";
import SpeedIcon from "@mui/icons-material/Speed";
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
        navigation
        initialSlide={0}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          // when window width is >= 480px
          500: {
            slidesPerView: 2,
          },
          700: {
            slidesPerView: 3,
          },
          1100: {
            slidesPerView: 4,
          },
          1380: {
            slidesPerView: 5,
          },
        }}
      >
        {hourlyForecast.map((forecast, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
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
                <Box
                  className="front-data"
                  style={{
                    height: "80%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6">
                    {formatTimeWithTimeZone(forecast.dt, state.timezone)}
                  </Typography>
                  <Icon
                    style={{ width: "5vw", minWidth: "60px", height: "auto" }}
                    weather={forecast}
                  />
                  <Typography variant="h6" style={{ fontWeight: "800" }}>
                    {Math.round(forecast.main.temp)}°C
                  </Typography>
                </Box>
              </Paper>
              <Paper
                className="flip-card back"
                onClick={() => handleCardClick(index)}
              >
                <Box className="three-sixty">
                  <ThreeSixtyIcon />
                </Box>
                <Box
                  className="back-data"
                  style={{
                    height: "80%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    alignItems: "start",
                  }}
                >
                  <Box className="back-box">
                    <AirIcon />
                    <Typography variant="body1">
                      :{" "}
                      {forecast.wind
                        ? `${(forecast.wind.speed * 3.6).toFixed(1)} km/h`
                        : "N/A"}
                    </Typography>
                  </Box>
                  <Box className="back-box">
                    <OpacityIcon />
                    <Typography variant="body1">
                      :{" "}
                      {forecast.main.humidity
                        ? Math.round(forecast.main.humidity)
                        : "N/A"}
                      %
                    </Typography>
                  </Box>
                  <Box className="back-box">
                    <SpeedIcon />
                    <Typography variant="body1">
                      :{" "}
                      {forecast.main.pressure
                        ? Math.round(forecast.main.pressure)
                        : "N/A"}{" "}
                      hPa
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </ReactCardFlip>
          </SwiperSlide>
        ))}
      </Swiper>
    </Paper>
  );
}

export default ForecastThreeHourly;
