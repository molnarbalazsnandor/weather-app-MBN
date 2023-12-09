import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import rainConfig from "./particles config/rainConfig";
import polygonConfig from "./particles config/polygonConfig";
import snowConfig from "./particles config/snowConfig";

const ParticlesBackground = ({ weather }) => {
  const particlesInit = useCallback((engine) => {}, []);

  const particlesLoaded = useCallback((container) => {}, []);

  let selectedConfig;

  if (weather === "rain") {
    selectedConfig = rainConfig;
  } else if (weather === "snow") {
    selectedConfig = snowConfig;
  } else {
    selectedConfig = polygonConfig;
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
