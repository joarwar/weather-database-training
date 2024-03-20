-- CreateTable
CREATE TABLE "WeatherCheck" (
    "id" SERIAL NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "currentTemp" TEXT NOT NULL,
    "currentWeather" TEXT NOT NULL,
    "currentDate" TEXT NOT NULL,
    "currentIcon" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tomorrowMin" TEXT NOT NULL,
    "tomorrowMax" TEXT NOT NULL,
    "tomorrowWeather" TEXT NOT NULL,
    "tomorrowDate" TEXT NOT NULL,
    "tomorrowIcon" TEXT,

    CONSTRAINT "WeatherCheck_pkey" PRIMARY KEY ("id")
);
