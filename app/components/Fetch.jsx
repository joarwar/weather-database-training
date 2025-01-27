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
  <div className="bg-blue-200 p-4 rounded-md mb-4 w-72 inline-block ">
    <h2 className="text-xl  text-slate-700 font-semibold mb-4 ">
      {city}, {country}
    </h2>
    <div className="mt-2">
      <h3 className="text-lg font-semibold text-slate-700" >{currentDate}:</h3>
      <div className="flex items-center justify-center"> 
        <img
          src={currentIcon}
          alt="Current Weather Icon"
          className="w-8 h-8 mr-2"
        />
        <p className="text-base text-slate-700">
          {currentTemp}° {currentTemp > 7 ? "😎" : "🥶"}
        </p>
      </div>
      <p className="text-base text-slate-700">{currentWeather}</p>
    </div>
    <div className="mt-2">
      <h3 className="text-lg font-semibold text-slate-700">{tomorrowDate}:</h3>
      <div className="flex items-center justify-center"> 
        <img
          src={tomorrowIcon}
          alt="Tomorrow Weather Icon"
          className="w-8 h-8 mr-2"
        />
        <p className="text-base text-slate-700">
          {tomorrowMin}° to {tomorrowMax}°
        </p>
      </div>
      <p className="text-base text-slate-700">{tomorrowWeather}</p>
    </div>
  </div>
</div>

  );
}