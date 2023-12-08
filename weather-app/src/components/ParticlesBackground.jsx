import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import particlesConfig from "./particles config/particles";

const ParticlesBackground = () => {
  const particlesInit = useCallback((engine) => {
    // Custom initialization if needed
    // console.log(engine);
  }, []);

  const particlesLoaded = useCallback((container) => {
    // Custom actions after particles are loaded if needed
    // console.log(container);
  }, []);

  return (
    <Particles
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: "0",
        left: "0",
      }}
      params={particlesConfig}
      init={particlesInit}
      loaded={particlesLoaded}
    />
  );
};

export default ParticlesBackground;
