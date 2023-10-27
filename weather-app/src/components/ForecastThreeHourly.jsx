import React, { useState } from "react";
import "./ForecastThreeHourly.css";
import { Paper, Typography, Box } from "@mui/material";
import ThreeSixtyIcon from "@mui/icons-material/ThreeSixty";
import ReactCardFlip from "react-card-flip";
import Icon from "./Icon";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function ForecastThreeHourly({
  weather,
  hourlyForecast,
  sunsetTime,
  setSunsetTime,
  sunriseTime,
  setSunriseTime,
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  const formatTimeWithTimeZone = (timestamp, timezone) => {
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

  return (
    <Box className="forecast-three-hourly">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={5}
        navigation
        initialSlide={0}
        style={{ width: "auto", height: "auto" }}
      >
        {hourlyForecast.map((forecast, index) => (
          <SwiperSlide
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ReactCardFlip
              key={forecast.dt}
              isFlipped={isFlipped}
              flipDirection="horizontal"
            >
              <Paper
                className="flip-card front"
                onClick={() => setIsFlipped(!isFlipped)}
              >
                <Icon
                  style={{ width: "5vw", height: "auto" }}
                  weather={forecast}
                  timezone={weather.timezone}
                  sunsetTime={sunsetTime}
                  setSunsetTime={setSunsetTime}
                  sunriseTime={sunriseTime}
                  setSunriseTime={setSunriseTime}
                />
                <Typography variant="h6">
                  Time: {formatTimeWithTimeZone(forecast.dt, weather.timezone)}
                </Typography>
                <Typography variant="h6">
                  Temperature: {Math.round(forecast.main.temp)}°C
                </Typography>
                <ThreeSixtyIcon
                  style={{ position: "absolute", top: 10, right: 10 }}
                />
              </Paper>

              <Paper
                className="flip-card back"
                onClick={() => setIsFlipped(!isFlipped)}
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
                <ThreeSixtyIcon
                  style={{ position: "absolute", top: 10, right: 10 }}
                />
              </Paper>
            </ReactCardFlip>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

export default ForecastThreeHourly;
