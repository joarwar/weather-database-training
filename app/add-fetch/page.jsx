"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCheck() {
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter()
  //const API_KEY = process.env.API_KEY;
  //console.log(process.env)

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Perform a GET request to fetch weather data
      // Horrible to put key here will fix later
      const weatherResponse = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=0a9b864a33dc410d9a5173252241703&q=${city}&days=2&aqi=no`
      );
      if (!weatherResponse.ok) {
        throw new Error("Failed to fetch city weather. Please check the spelling.");
      }
      const weatherData = await weatherResponse.json();
      //console.log(weatherData);
      let currentTemp = weatherData.current.temp_c;
      let tomorrowMin = weatherData.forecast.forecastday[1].day.mintemp_c;
      let tomorrowMax = weatherData.forecast.forecastday[1].day.maxtemp_c;
      let tomorrowWeather =
        weatherData.forecast.forecastday[1].day.condition.text
        
      let currentTempAsString = String(currentTemp);
      let tomorrowDate = weatherData.forecast.forecastday[1].date;
      let tomorrowMinAsString = String(tomorrowMin);
      let tomorrowMaxAsString = String(tomorrowMax);
      let tomorrowWeatherAsString = String(tomorrowWeather);
      let tomorrowDateAsString = String(tomorrowDate);

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
          currentIcon:weatherData.forecast.forecastday[0].day.condition.icon,
          createdAt: new Date().toISOString(),
          tomorrowMin: tomorrowMinAsString,
          tomorrowMax: tomorrowMaxAsString,
          tomorrowWeather: tomorrowWeatherAsString,
          tomorrowDate: tomorrowDateAsString,
          tomorrowIcon:weatherData.forecast.forecastday[1].day.condition.icon,
        }),
        
      }
      );
      if (!addResponse.ok) {
        throw new Error("Failed to add city");
      }
      router.refresh()
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
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center text-slate-700">Enter a city to see the weather!</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="flex items-center border rounded-md overflow-hidden">
          <input
            type="text"
            id="title"
            value={city}
            onChange={handleChange}
            required
            className="px-4 py-2 w-full focus:outline-none text-slate-500"
            placeholder="Enter city "
          />
          <button
            type="submit"
            className="bg-slate-500 hover:bg-blue-600 text-white font-semibold px-4 py-2"
          >
            Check
          </button>
        </div>
      </form>
    </div>
    <div className="p-2 text-lg font-bold">{error && <p> {error}</p>}</div>
  </main>
  );
}
