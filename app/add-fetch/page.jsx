"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import mqtt from "mqtt"; // Import MQTT library

export const dynamic = "force-dynamic";

export default function AddCheck() {
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const [buttonPressed, setButtonPressed] = useState(false);

  // MQTT states for wind speed and temperature
  const [windSpeed, setWindSpeed] = useState(0);
  const [temperature, setTemperature] = useState(0);

  const mqttBroker = "wss://broker.hivemq.com:8000/mqtt"; // WebSocket MQTT broker
  const mqttTopicWind = "yrgo_ei23/vind_ms/grupp1";
  const mqttTopicTemp = "yrgo_ei23/temp_degC/grupp1";

  useEffect(() => {
    // Connect to MQTT broker
    const client = mqtt.connect(mqttBroker);

    client.on("connect", () => {
      console.log("Connected to MQTT broker");

      // Subscribe to topics
      client.subscribe(mqttTopicWind, (err) => {
        if (err) console.error("Failed to subscribe to wind topic", err);
      });

      client.subscribe(mqttTopicTemp, (err) => {
        if (err) console.error("Failed to subscribe to temperature topic", err);
      });
    });

    client.on("message", (topic, message) => {
      // Update state based on the received topic
      if (topic === mqttTopicWind) {
        setWindSpeed(parseFloat(message.toString()));
      } else if (topic === mqttTopicTemp) {
        setTemperature(parseFloat(message.toString()));
      }
    });

    client.on("error", (err) => {
      console.error("MQTT connection error:", err);
    });

    // Cleanup on component unmount
    return () => {
      client.end();
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setButtonPressed(true);

    try {
      // Perform a GET request to fetch weather data
      const weatherResponse = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_API_KEY}&q=${city}&days=2&aqi=no`
      );
      if (!weatherResponse.ok) {
        throw new Error(
          "Failed to fetch city weather. Please check the spelling."
        );
      }
      const weatherData = await weatherResponse.json();

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
          createdAt: new Date().toISOString(),
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

      router.refresh();
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
        <h1 className="text-2xl font-bold mb-4 text-slate-400">
          Enter a city to check the weather!
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
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded "
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
      </div>

      {/* Display MQTT data */}
      <div className="mt-4 p-4 bg-blue-100 rounded shadow-md">
        <h2 className="text-xl font-semibold text-slate-600">
          Live Sensor Data:
        </h2>
        <p className="text-lg text-slate-700">
          <strong>Wind Speed:</strong> {windSpeed} m/s
        </p>
        <p className="text-lg text-slate-700">
          <strong>Temperature:</strong> {temperature} °C
        </p>
      </div>
    </main>
  );
}
