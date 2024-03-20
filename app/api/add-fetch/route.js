import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const {
      city,
      country,
      currentTemp,
      currentWeather,
      currentDate,
      createdAt,
      currentIcon,
      tomorrowMin,
      tomorrowMax,
      tomorrowWeather,
      tomorrowDate,
      tomorrowIcon,
    } = await request.json();
    console.log({
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
    });

    const result = await prisma.WeatherCheck.create({
      data: {
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
      },
    });

    return NextResponse.json({ data: result });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error("Internal Server Error");
  }
}