import { Prisma, PrismaClient } from "@prisma/client";
import Fetch from "./components/Fetch";
import AddCheck from "./add-fetch/page";

const prisma = new PrismaClient();

async function getFetches() {
  const weatherChecks = await prisma.weatherCheck.findMany({
    orderBy: { createdAt: "desc" },
    skip: 1,
    take: 3,
  });
  return weatherChecks;
}
async function getOne() {
  const weatherChecks = await prisma.weatherCheck.findMany({
    orderBy: { createdAt: "desc" },
    take: 1,
  });
  return weatherChecks;
}

export default async function Home() {
  const checks = await getFetches();
  const checkOne = await getOne();
  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-md mx-auto bg-white p-4 rounded-lg shadow-md">
        <AddCheck />
        <h2 className="text-center font-semibold text-lg text-slate-700  ">
          Latest:{" "}
        </h2>
        {checkOne.map((WeatherCheck) => {
          return (
            <Fetch
              key={WeatherCheck.id}
              id={WeatherCheck.id}
              city={WeatherCheck.city}
              country={WeatherCheck.country}
              currentTemp={WeatherCheck.currentTemp}
              currentWeather={WeatherCheck.currentWeather}
              currentDate="Current"
              currentIcon={WeatherCheck.currentIcon}
              createdAt={WeatherCheck.createdAt}
              tomorrowMin={WeatherCheck.tomorrowMin}
              tomorrowMax={WeatherCheck.tomorrowMax}
              tomorrowWeather={WeatherCheck.tomorrowWeather}
              tomorrowDate="Tomorrow"
              tomorrowIcon={WeatherCheck.tomorrowIcon}
            />
          );
        })}
        </div>
      <div className="max-w-md mx-auto bg-slate-50 mt-5 p-2 rounded-lg shadow-md">
        <h2 className="text-center font-semibold text-lg text-slate-700  ">
          History:{" "}
        </h2>
        {checks.map((WeatherCheck) => {
          return (
            <Fetch
              key={WeatherCheck.id}
              id={WeatherCheck.id}
              city={WeatherCheck.city}
              country={WeatherCheck.country}
              currentTemp={WeatherCheck.currentTemp}
              currentWeather={WeatherCheck.currentWeather}
              currentDate={WeatherCheck.currentDate}
              currentIcon={WeatherCheck.currentIcon}
              createdAt={WeatherCheck.createdAt}
              tomorrowMin={WeatherCheck.tomorrowMin}
              tomorrowMax={WeatherCheck.tomorrowMax}
              tomorrowWeather={WeatherCheck.tomorrowWeather}
              tomorrowDate={WeatherCheck.tomorrowDate}
              tomorrowIcon={WeatherCheck.tomorrowIcon}
            />
          );
        })}
        <div></div>
      </div>
    </main>
  );
}
