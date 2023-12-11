// pages/index.tsx
import React, { useState, useEffect } from 'react';
import { PageTemplate, WeatherForm, WeatherDisplay } from '@/src/components/exports';
import { ForecastData } from '@/src/types';
import { apiForecastData, apiForecastDataByCoords } from '../src/request/request';

const Home: React.FC = () => {
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const requestGeolocationPermission = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const data = await apiForecastDataByCoords(latitude, longitude);
              setForecastData(data);
            } catch (error) {
              setError('Erreur lors de la récupération des données météo.');
            }
          },
          (error) => {
            if (error.code === error.PERMISSION_DENIED) {
              setError("Géolocalisation refusée. Veuillez activer la géolocalisation dans les paramètres de votre navigateur.");
            } else {
              setError("Erreur de géolocalisation.");
            }
          }
        );
      } else {
        setError('La géolocalisation n’est pas supportée par ce navigateur.');
      }
    };

    requestGeolocationPermission();
  }, []);
  
  const handleSearch = async (city: string) => {
    if (city.trim().length === 0) {
      setError('Veuillez entrer un nom de ville.');
      setForecastData(null);
      return;
    }

    if (forecastData && city === forecastData.name) {
      return;
    } 

    setError(null);
    setForecastData(null);

    try {
      const data = await apiForecastData(city);
      setForecastData(data);
    } catch (error: any) {
      if (error.status === 404) {
        setError('Ville non trouvée');
      } else {
        setError('Erreur lors de la récupération des données météo');
      }
    }
  };

  return (
    <PageTemplate>
      <WeatherForm onSearch={handleSearch} />
      {error && <div className="text-center text-red-500">Erreur : {error}</div>}
      {!error && forecastData && <WeatherDisplay weatherData={transformForecastDataToWeatherData(forecastData)} />}
    </PageTemplate>
  );
};

export default Home;

// Helper function to transform the data
function transformForecastDataToWeatherData(forecastData: ForecastData) {
  return {
    city: forecastData.name,
    country: forecastData.sys.country,
    weather: {
      main: forecastData.weather[0].main,
      description: forecastData.weather[0].description,
      icon: forecastData.weather[0].icon,
      temperature: forecastData.main.temp,
      feels_like: forecastData.main.feels_like,
      temp_min: forecastData.main.temp_min,
      temp_max: forecastData.main.temp_max,
      sunrise: forecastData.sys.sunrise,
      sunset: forecastData.sys.sunset,
    },
    wind: {
      speed: forecastData.wind.speed,
    },
    humidity: forecastData.main.humidity,
  };
}
