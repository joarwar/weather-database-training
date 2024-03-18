import prisma from "@/lib/prisma";
import Fetch from "./components/Fetch";
import API from "./components/API"
import Link from "next/link";
import AddCheck from "./add-fetch/page";

async function getFetches() {
  const weatherChecks = await prisma.WeatherCheck.findMany();
  return weatherChecks;
}


export default async function Home() {
  const checks = await getFetches();
  console.log(checks);
  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4">
      <Link href={"/add-fetch"}>Check the weather</Link>
      <h1>History</h1>
      <API/>
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
            createdAt={WeatherCheck.createdAt}
            tomorrowMin={WeatherCheck.tomorrowMin}
            tomorrowMax={WeatherCheck.tomorrowMax}
            tomorrowWeather={WeatherCheck.tomorrowWeather}
            tomorrowDate={WeatherCheck.tomorrowDate}
          />
        );
      })}
    </main>
  );
}
