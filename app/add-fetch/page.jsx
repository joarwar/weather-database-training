"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import mqtt from "mqtt";

export const dynamic = "force-dynamic";

export default function AddCheck() {
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [showMQTT, setShowMQTT] = useState(false); // State to toggle MQTT section

  // MQTT-related states
  const [windSpeed, setWindSpeed] = useState(0);
  const [temperature, setTemperature] = useState(0);

  const mqttBroker = "wss://broker.hivemq.com:8000/mqtt";
  const mqttTopicWind = "yrgo_ei23/vind_ms/grupp1";
  const mqttTopicTemp = "yrgo_ei23/temp_degC/grupp1";

  useEffect(() => {
    if (showMQTT) {
      const client = mqtt.connect(mqttBroker);

      client.on("connect", () => {
        console.log("Connected to MQTT broker");
        client.subscribe(mqttTopicWind);
        client.subscribe(mqttTopicTemp);
      });

      client.on("message", (topic, message) => {
        if (topic === mqttTopicWind) {
          setWindSpeed(parseFloat(message.toString()));
        } else if (topic === mqttTopicTemp) {
          setTemperature(parseFloat(message.toString()));
        }
      });

      return () => {
        client.end(); // Clean up the MQTT connection on unmount
      };
    }
  }, [showMQTT]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setButtonPressed(true);

    try {
      const weatherResponse = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=0a9b864a33dc410d9a5173252241703&q=${city}&days=2&aqi=no`
      );

      if (!weatherResponse.ok) {
        throw new Error("Failed to fetch city weather. Please check the spelling.");
      }

      const weatherData = await weatherResponse.json();

      const currentTemp = String(weatherData.current.temp_c);
      const tomorrowMin = String(weatherData.forecast.forecastday[1].day.mintemp_c);
      const tomorrowMax = String(weatherData.forecast.forecastday[1].day.maxtemp_c);
      const tomorrowWeather = String(weatherData.forecast.forecastday[1].day.condition.text);
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

        {/* Toggle MQTT Section */}
        <button
          onClick={() => setShowMQTT(!showMQTT)}
          className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded"
        >
          {showMQTT ? "Hide MQTT " : "MQTT"}
        </button>

        {/* MQTT Data Section */}
        {showMQTT && (
          <div className="mt-6 p-6 border rounded-lg bg-gradient-to-r from-blue-50 to-blue-200 shadow-md w-full max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4 text-center">Station of the Weather</h2>
            <p className="text-lg text-gray-700 mb-3"><strong>Wind:</strong> {windSpeed} m/s</p>
            <p className="text-lg text-gray-700 mb-3"><strong>Temperature:</strong> {temperature} °C</p>
            <p className="text-gray-700 mb-4 text-sm italic">Utilizing local sensors to simulate conditions for being on a boat. Setup is currently an Arduino & RPI communication through Bluetooth.</p>
  
          <div className="flex justify-center items-center mt-4">
  </div>
</div>

        )}
      </div>
    </main>
  );
}
