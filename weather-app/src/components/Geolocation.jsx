import React, { useEffect } from "react";
import { geoApiOptions, GEO_API_URL } from "../api";

const Geolocation = ({ setSelectedCity }) => {
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          fetch(
            `${GEO_API_URL}/locations/${latitude.toFixed(
              4
            )}+${longitude.toFixed(
              4
            )}/nearbyCities?limit=1&minPopulation=100000&radius=100`,
            geoApiOptions
          )
            .then((response) => response.json())
            .then((data) => {
              console.log("GeoDB Response Data:", data);

              if (data && data.data && data.data.length > 0) {
                const city = data.data[0];
                setSelectedCity({ label: city.name, value: city.name });
              } else {
                console.error("City not found");
              }
            })
            .catch((error) => {
              console.error("Error fetching GeoDB data:", error);
              console.error("Error fetching city: " + error.message);
            });
        },
        (error) => {
          if (error.message === "User denied geolocation prompt") {
            // Geolocation denied, set to Budapest
            setSelectedCity({ label: "Budapest", value: "Budapest" });
          } else {
            console.error("Error fetching geolocation: " + error.message);
          }
        }
      );
    } else {
      console.error("Geolocation is not available in this browser.");
    }
  }, [setSelectedCity]);

  return null;
};

export default Geolocation;
