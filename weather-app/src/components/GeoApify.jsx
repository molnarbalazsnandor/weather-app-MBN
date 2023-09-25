import React, { useState } from "react";
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";

const App = () => {
  function onPlaceSelect(value) {
    console.log(value);
  }

  function onSuggectionChange(value) {
    console.log(value);
  }

  function preprocessHook(value) {
    return `${value}, Munich, Germany`;
  }

  function postprocessHook(feature) {
    return feature.properties.street;
  }

  function suggestionsFilter(suggestions) {
    const processedStreets = [];

    const filtered = suggestions.filter((value) => {
      if (
        !value.properties.street ||
        processedStreets.indexOf(value.properties.street) >= 0
      ) {
        return false;
      } else {
        processedStreets.push(value.properties.street);
        return true;
      }
    });

    return filtered;
  }

  return (
    <GeoapifyContext apiKey="0ac062eaa1d743a69175e5b4a7bbe04a">
      <GeoapifyGeocoderAutocomplete
        type="city"
        limit={4}
        format="json"
        placeSelect={onPlaceSelect}
        suggestionsChange={onSuggectionChange}
      />
    </GeoapifyContext>
  );
};

export default App;
