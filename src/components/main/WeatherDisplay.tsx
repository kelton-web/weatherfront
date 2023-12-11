import React from "react";
import { motion } from "framer-motion";
import Image from 'next/image';

interface WeatherData {
  city: string;
  country: string;
  weather: {
    main: string;
    description: string;
    icon: string;
    temperature: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    sunrise: number;
    sunset: number;
  };
  wind: {
    speed: number;
  };
  humidity: number;
}

interface WeatherDisplayProps {
  weatherData?: WeatherData;
  error?: any;
}

const kelvinToCelsius = (kelvin: number) => Math.round(kelvin - 273.15);

const formatTime = (timestamp: number) =>
  new Date(timestamp * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

const WeatherInfo = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-gray-600">{value}</p>
  </div>
);

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  weatherData,
  error,
}) => {
  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!weatherData) {
    return <div className="text-center">Aucune donnée météo disponible.</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-auto p-6 max-w-lg bg-white rounded-lg shadow-lg mt-5"
    >
      <div className="text-center mb-4">
        <p className="text-gray-500 text-sm">
          {new Date().toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        <p className="text-2xl font-bold">{`${weatherData.city}, ${weatherData.country}`}</p>
        <div className="flex justify-center items-center mt-3">
          <Image
            src={`http://openweathermap.org/img/wn/${weatherData.weather.icon}.png`}
            alt={weatherData.weather.description}
            className="w-20 h-20"
          />
          <p className="text-4xl ml-3">{`${kelvinToCelsius(
            weatherData.weather.temperature
          )}°C`}</p>
        </div>
        <p className="text-gray-600">{weatherData.weather.main}</p>
        <p className="text-gray-500">{`Ressentie à ${kelvinToCelsius(
          weatherData.weather.feels_like
        )}°C`}</p>
      </div>
      <div className="flex justify-around border-t border-gray-200 pt-4 mt-4">
        <WeatherInfo
          label="Max/Min"
          value={`${kelvinToCelsius(
            weatherData.weather.temp_max
          )}°C / ${kelvinToCelsius(weatherData.weather.temp_min)}°C`}
        />
        <WeatherInfo label="Humidité" value={`${weatherData.humidity}%`} />
        <WeatherInfo label="Vent" value={`${weatherData.wind.speed} km/h`} />
      </div>
      <div className="flex justify-around mt-4">
        <p className="text-xs text-gray-500">{`Lever du soleil : ${formatTime(
          weatherData.weather.sunrise
        )}`}</p>
        <p className="text-xs text-gray-500">{`Coucher du soleil : ${formatTime(
          weatherData.weather.sunset
        )}`}</p>
      </div>
    </motion.div>
  );
};

export default WeatherDisplay;
