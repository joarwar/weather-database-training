"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import mqtt from "mqtt";

export const dynamic = "force-dynamic";

export default function AddCheck() {
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);
  const [buttonPressed, setButtonPressed] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setButtonPressed(true);

    try {
      const weatherResponse = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=0a9b864a33dc410d9a5173252241703&q=${city}&days=2&aqi=no`
      );

      if (!weatherResponse.ok) {
        throw new Error(
          "Failed to fetch city weather. Please check the spelling."
        );
      }

      const weatherData = await weatherResponse.json();

      const currentTemp = String(weatherData.current.temp_c);
      const tomorrowMin = String(
        weatherData.forecast.forecastday[1].day.mintemp_c
      );
      const tomorrowMax = String(
        weatherData.forecast.forecastday[1].day.maxtemp_c
      );
      const tomorrowWeather = String(
        weatherData.forecast.forecastday[1].day.condition.text
      );
      const tomorrowDate = String(weatherData.forecast.forecastday[1].date);

      const addResponse = await fetch("/api/add-fetch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          city: weatherData.location.name,
          country: weatherData.location.country,
          currentTemp,
          currentWeather: weatherData.current.condition.text,
          currentDate: weatherData.location.localtime,
          currentIcon: weatherData.forecast.forecastday[0].day.condition.icon,
          createdAt: new Date().toISOString(),
          tomorrowMin,
          tomorrowMax,
          tomorrowWeather,
          tomorrowDate,
          tomorrowIcon: weatherData.forecast.forecastday[1].day.condition.icon,
        }),
      });

      if (!addResponse.ok) {
        throw new Error("Failed to add city weather data.");
      }

      setButtonPressed(false);
      setError(null);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
      setButtonPressed(false);
    }
  };

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <main>
      <div className="flex flex-col items-center">
        {/* Weather Search Section */}
        <h1 className="text-2xl font-bold mb-4 text-slate-400">
          Check the weather!
        </h1>
        <form onSubmit={handleSubmit} className="mb-4 flex items-center">
          <input
            type="text"
            id="city"
            value={city}
            onChange={handleChange}
            className="px-4 py-2 mr-2 rounded border focus:outline-none focus:ring focus:border-blue-300 bg-slate-200 text-black"
            placeholder="Enter city"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
          >
            Search
          </button>
        </form>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          buttonPressed && (
            <img
              src="transparent-loading.gif"
              alt="Loading..."
              className="w-10 h-10"
            />
          )
        )}

        <div className="flex justify-center items-center mt-4"></div>
      </div>
    </main>
  );
}
