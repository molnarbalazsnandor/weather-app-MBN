import React, { useState } from "react";
import { Box } from "@mui/material";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "./../api";

const GeoDbAutocomplete = ({ onCitySelect }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      });
  };

  const handleOnChange = (selectedOption) => {
    setSearch(selectedOption);
    onCitySelect(selectedOption);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "5px",
      width: "60vw",
      minWidth: "350px",
      marginLeft: "3%",
      border: "2px solid #9399a2",
      backgroundColor: "#202B3B",
      boxShadow: state.isFocused ? "0 0 0 2px #3699FF" : null,
      "& div": {
        color: "white ",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#3699FF" : "#676984",
      color: state.isFocused ? "white" : "black",
    }),
  };

  return (
    <Box className="autocomplete">
      <AsyncPaginate
        className="async-paginate"
        placeholder="Search for a city"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
        defaultOptions={[]}
        styles={customStyles}
      />
    </Box>
  );
};

export default GeoDbAutocomplete;
