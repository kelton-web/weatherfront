// src/request/request.ts
import { ForecastData } from "@/src/types";

export const authServerDomain = process.env.NEXT_PUBLIC_BACKENDEPLOY as string;

function constructAuthServerURL(endpoint: string): string {
  return `${authServerDomain}${endpoint}`;
}

export async function apiForecastData(city: string): Promise<ForecastData> {
  const response = await fetch(constructAuthServerURL(`/api/weather/forecast?city=${city}`), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    
    const error = {
      message: `HTTP error! status: ${response.status}`,
      status: response.status
    };
    console.log(error);
    throw error;
  }

  const forecastData = await response.json() as ForecastData;
  return forecastData;
}


export async function apiForecastDataByCoords(lat: number, lon: number): Promise<ForecastData> {
  const response = await fetch(constructAuthServerURL(`/api/weather/forecastByCoords?lat=${lat}&lon=${lon}`), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    const error = {
      message: `HTTP error! status: ${response.status}`,
      status: response.status
    };
    throw error;
  }

  const forecastData = await response.json() as ForecastData;
  return forecastData;
}
