"use client";
// pages/index.tsx
import { useState } from "react";

async function getData(city: string) {
  const res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=0a9b864a33dc410d9a5173252241703&q=${city}&days=2&aqi=no&alerts=no`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default function Page() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<any>(null); // Assuming any type for weatherData
  const fetchWeather = async () => {
    try {
      const data = await getData(city);
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  return (
<main className="min-h-screen bg-gray-100 py-8 px-4">
  <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
    <h1 className="text-3xl font-semibold mb-4 text-slate-500">Enter a city to get the weather!</h1>
    <div className="flex items-center mb-4">
      <input
        type="text"
        placeholder="Enter city"
        className="border border-gray-300 rounded-l-md px-4 py-2 w-full text-slate-500"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button className="bg-slate-400 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-r-md" onClick={fetchWeather}>Check</button>
    </div>
    {weatherData && (
      <div>
        <h2 className="text-xl font-semibold mb-4 text-slate-500">Current Weather in {weatherData.location.name}, {weatherData.location.country}</h2>
        <div className="bg-gray-200 p-4 rounded-md mb-4 flex items-center text-slate-500">
          <img src={`http:${weatherData.current.condition.icon}`} alt={weatherData.current.condition.text} className="w-12 h-12 mr-4" />
          <div>

            <p className="text-lg text-slate-500">Temperature: {weatherData.current.temp_c}° {weatherData.current.temp_c > 7 ? '😎' : weatherData.current.temp_c < 7 && '🥶'}</p>
            <p className="text-lg text-slate-500">Condition: {weatherData.current.condition.text}</p>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2 text-slate-500">Tomorrow&#39;s Weather Forecast</h2>
          {weatherData.forecast && weatherData.forecast.forecastday.length > 1 && (
            <div className="bg-gray-200 p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-2 text-slate-500">{weatherData.forecast.forecastday[1].date}</h3>
              <div className="flex items-center">
                <img src={`http:${weatherData.forecast.forecastday[1].day.condition.icon}`} alt={weatherData.forecast.forecastday[1].day.condition.text} className="w-10 h-10 mr-4" />
                <div>
                  <p className="text-lg text-slate-500">Max Temperature: {weatherData.forecast.forecastday[1].day.maxtemp_c}° {weatherData.forecast.forecastday[1].day.maxtemp_c > 7 ? '😎' : weatherData.forecast.forecastday[1].day.maxtemp_c < 7 && '🥶'}</p>
                  <p className="text-lg text-slate-500">Min Temperature: {weatherData.forecast.forecastday[1].day.mintemp_c}° {weatherData.forecast.forecastday[1].day.mintemp_c > 7 ? '😎' : weatherData.forecast.forecastday[1].day.mintemp_c < 7 && '🥶'}</p>
                  <p className="text-lg text-slate-500">Weather: {weatherData.forecast.forecastday[1].day.condition.text}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )}
  </div>
</main>

  );
}
