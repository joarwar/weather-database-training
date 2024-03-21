"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export const dynamic = 'force-dynamic';
export default function AddCheck() {
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter()
  const [buttonPressed, setButtonPressed] = useState(false);
  //const API_KEY = process.env.API_KEY;
  //console.log(process.env)

  const handleSubmit = async (event) => {
    event.preventDefault();
    setButtonPressed(true);

    try {
      // Perform a GET request to fetch weather data
      // Horrible to put key here will fix later
      const weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0a9b864a33dc410d9a5173252241703&q=${city}&days=2&aqi=no`);
      if (!weatherResponse.ok) {
        throw new Error(
          "Failed to fetch city weather. Please check the spelling."
        );
      }
      const weatherData = await weatherResponse.json();
      //console.log(weatherData);
      let currentTemp = weatherData.current.temp_c;
      let tomorrowMin = weatherData.forecast.forecastday[1].day.mintemp_c;
      let tomorrowMax = weatherData.forecast.forecastday[1].day.maxtemp_c;
      let tomorrowWeather =
        weatherData.forecast.forecastday[1].day.condition.text;

      let currentTempAsString = String(currentTemp);
      let tomorrowDate = weatherData.forecast.forecastday[1].date;
      let tomorrowMinAsString = String(tomorrowMin);
      let tomorrowMaxAsString = String(tomorrowMax);
      let tomorrowWeatherAsString = String(tomorrowWeather);
      let tomorrowDateAsString = String(tomorrowDate);

      // Perform a POST request to add city data
      const addResponse = await fetch("/api/add-fetch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          city: weatherData.location.name,
          country: weatherData.location.country,
          currentTemp: currentTempAsString,
          currentWeather: weatherData.current.condition.text,
          currentDate: weatherData.location.localtime,
          currentIcon: weatherData.forecast.forecastday[0].day.condition.icon,
          createdAt: new Date().toISOString(), // Assuming you want the current date and time
          tomorrowMin: tomorrowMinAsString,
          tomorrowMax: tomorrowMaxAsString,
          tomorrowWeather: tomorrowWeatherAsString,
          tomorrowDate: tomorrowDateAsString,
          tomorrowIcon: weatherData.forecast.forecastday[1].day.condition.icon,
        }),
      });
      if (!addResponse.ok) {
        throw new Error("Failed to add city");
      }
      router.refresh()
      setButtonPressed(false);
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
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4 text-slate-400">Enter a city to check the weather!</h1>
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
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded "
          >
            Search
          </button>
        </form>
        {error ? (
        <p className="text-red-500">{error}</p>
      ) : buttonPressed && (
        <img src="transparent-loading.gif" alt="Loading..." className="w-10 h-10"/>

      )}
      </div>
    </main>
  );
}
