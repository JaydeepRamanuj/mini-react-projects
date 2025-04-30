import React, { useEffect, useState } from "react";
import useGeoLocation from "./useGetCurrentGeoLocation";

function WeatherApp() {
  const [input, setInput] = useState("");
  const [weatherData, setWeatherData] = useState();

  useGeoLocation();
  useEffect(() => {}, []);
  async function getWeatherData() {
    const API_KEY = "50ba131b83adf4c8842df7cfd0821f0e";
    const response = fetch("");

    if (response.ok) {
      const result = await response.json();
      setWeatherData(result);
    }
  }

  return (
    <>
      <div>
        <input
          type="text"
          name=""
          value={input}
          id=""
          placeholder="Enter city name"
          onChange={setInput}
        />
        <button onClick={getWeatherData}>Show</button>
      </div>

      <div>WeatherApp</div>
    </>
  );
}

export default WeatherApp;
