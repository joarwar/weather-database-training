export const dynamic = 'force-dynamic';

export default function Fetch({
  id,
  city,
  country,
  currentTemp,
  currentWeather,
  currentDate,
  currentIcon,
  createdAt,
  tomorrowMin,
  tomorrowMax,
  tomorrowWeather,
  tomorrowDate,
  tomorrowIcon,
}) {
  return (
    <div className="mb-8 text-center mt-4">
      <div className="bg-gradient-to-r from-blue-50 to-blue-200 p-6 rounded-xl shadow-xl w-72 inline-block transition-all duration-300 hover:scale-105 hover:shadow-lg">
        <h2 className="text-xl text-slate-700 font-semibold mb-4 tracking-wide">
          {city}, {country}
        </h2>
        <div className="mt-2">
          <h3 className="text-lg font-semibold text-slate-700">{currentDate}:</h3>
          <div className="flex items-center justify-center mt-2">
            <img
              src={currentIcon}
              alt="Current Weather Icon"
              className="w-10 h-10 mr-2 transition-all duration-300 transform hover:scale-110"
            />
            <p className="text-base text-slate-700 font-medium">
              {currentTemp}° {currentTemp > 7 ? "😎" : "🥶"}
            </p>
          </div>
          <p className="text-base text-slate-700 mt-1">{currentWeather}</p>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-slate-700">{tomorrowDate}:</h3>
          <div className="flex items-center justify-center mt-2">
            <img
              src={tomorrowIcon}
              alt="Tomorrow Weather Icon"
              className="w-10 h-10 mr-2 transition-all duration-300 transform hover:scale-110"
            />
            <p className="text-base text-slate-700 font-medium">
              {tomorrowMin}° to {tomorrowMax}°
            </p>
          </div>
          <p className="text-base text-slate-700 mt-1">{tomorrowWeather}</p>
        </div>
      </div>
    </div>
  );
}
