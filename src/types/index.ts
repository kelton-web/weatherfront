// src/types.ts

export interface WeatherCondition {
    id: number;
    main: string;
    description: string;
    icon: string;
  }
  
  export interface MainData {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  }
  
  export interface WindData {
    speed: number;
    deg: number;
  }
  
  export interface ForecastData {
    coord: {
      lon: number;
      lat: number;
    };
    weather: WeatherCondition[];
    base: string;
    main: MainData;
    visibility: number;
    wind: WindData;
    clouds: {
      all: number;
    };
    dt: number;
    sys: {
      type: number;
      id: number;
      country: string;
      sunrise: number;
      sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
  }
  