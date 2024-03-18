export default function Fetch({
  id,
  city,
  country,
  currentTemp,
  currentWeather,
  currentDate,
  createdAt,
  tomorrowMin,
  tomorrowMax,
  tomorrowWeather,
  tomorrowDate,
}) {
  return (
    
<div className="mb-8 ">
  <h2 className="text-xl font-semibold mb-4">
    {city}, {country}
  </h2>
  <div className="bg-gray-200 p-4 rounded-md mb-4 flex items-center">
    <div>
      <h3 className="text-lg font-semibold mb-2">{currentDate}</h3>
      <p className="text-lg">
        Temperature: {currentTemp}°C {currentTemp > 7 ? "😎" : "🥶"}
      </p>
      <p className="text-lg">Weather: {currentWeather}</p>
    </div>
  </div>
  <div className="overflow-x-auto">
  <h2 className="text-xl font-semibold mb-2">
    Tomorrow&#39;s Weather Forecast
  </h2>
  <div className="bg-gray-200 p-4 rounded-md">
    <h3 className="text-lg font-semibold mb-2">{tomorrowDate}</h3>
    <div className="flex items-center">
      <div>
        <p className="text-lg">
          Max Temperature: {tomorrowMax}°C {tomorrowMax > 7 ? "😎" : "🥶"}
        </p>
        <p className="text-lg">
          Min Temperature: {tomorrowMin}°C {tomorrowMin > 7 ? "😎" : "🥶"}
        </p>
        <p className="text-lg">Weather: {tomorrowWeather}</p>
      </div>
    </div>
  </div>
</div>
</div>
  );
}
