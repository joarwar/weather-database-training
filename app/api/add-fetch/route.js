import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function prismaAdd() {
    const newWeatherCheck = await prisma.WeatherCheck.create({
      data: {
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
      },
    });
    const check_all = await prisma.WeatherCheck.findMany();
}

export default prismaAdd;