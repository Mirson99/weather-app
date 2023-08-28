import { useState } from "react";
import CoordinatesForm from "../input-section/CoordinatesForm";
import "./homepage.css";
import { DailyWeatherData } from "../../types/DailyWeatherData";
import DailyWeatherList from "../daily-weather-list/DailyWeatherList";

export default function Homepage() {
  const [dailyWeatherList, setDailyWeatherList] = useState<DailyWeatherData[]>(
    []
  );
  const [longitude, setLongitude] = useState<number>(0);
  const [latitude, setLatitude] = useState<number>(0);

  return (
    <div className="homepage">
      <div className="homepage__header">
        <h1>Weather App</h1>
        <p>Type latitude and longitude of location to get weather forecast.</p>
      </div>
      <CoordinatesForm
        returnWeatherData={(weatherDataList, longitude, latitude) => {
          setDailyWeatherList(weatherDataList);
          setLatitude(latitude);
          setLongitude(longitude);
        }}
      />
      {dailyWeatherList.length > 0 && (
        <DailyWeatherList dailyWeatherData={dailyWeatherList} latitude={latitude} longitude={longitude}/>
      )}
    </div>
  );
}
