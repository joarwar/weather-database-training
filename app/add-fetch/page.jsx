'use client'
import Link from "next/link";
import { useState } from "react";

export default function AddCheck() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const weatherResponse = await fetch(
        // need to fix api key
        `https://api.weatherapi.com/v1/forecast.json?key=&q=${city}&days=2&aqi=no`
      );
      if (!weatherResponse.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const weatherData = await weatherResponse.json();
      setWeatherData(weatherData);
      

      await fetch("/api/add-fetch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Method": "POST"
        },
        body: JSON.stringify({
          city: weatherData.location.name,
          country: weatherData.location.country,
          currentTemp: weatherData.current.temp_c,
          currentWeather: weatherData.current.condition.text,
          currentDate: weatherData.location.localtime,
          createdAt: new Date().toISOString(),
          tomorrowMin: weatherData.forecast.forecastday[0].day.mintemp_c,
          tomorrowMax: weatherData.forecast.forecastday[0].day.maxtemp_c,
          tomorrowWeather: weatherData.forecast.forecastday[0].day.condition.text,
          tomorrowDate: weatherData.forecast.forecastday[0].date,
        }),
      });

      setError(null);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    }
  };

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <main>
      <h1>Check Weather</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center">
          <input
            type="text"
            id="city"
            value={city}
            onChange={handleChange}
            required
          />
          <button type="submit">Submit</button>
        </div>
      </form>
      {error && <p>{error}</p>}
      {/* Display weatherData here if needed */}
    </main>
  );
}
