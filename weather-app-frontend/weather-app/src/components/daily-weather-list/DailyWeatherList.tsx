import { DailyWeatherData } from "../../types/DailyWeatherData";
import { CSVLink } from 'react-csv';
import "./dailyWeatherList.css";

interface DailyWeatherListProps {
  dailyWeatherData: DailyWeatherData[];
  latitude: number;
  longitude: number;
}

export default function DailyWeatherList({
  dailyWeatherData,
  latitude,
  longitude,
}: DailyWeatherListProps) {
  const dailyWeatherDataList = dailyWeatherData.map((d, index) => (
    <div
      className={
        index % 2 !== 0
          ? "daily-weather-list__row"
          : "daily-weather-list__row daily-weather-list__row--dark"
      }
      key={d.date}
    >
      <div className="daily-weather-list__column">{d.date}</div>
      <div className="daily-weather-list__column">
        {d.averageTemperature} &deg;
      </div>
    </div>
  ));

  // Generowanie linku do pobrania pliku CSV
  const csvFileName = "daily_weather_data.csv";
  const csvHeaders = [
    { label: "Date", key: "date" },
    { label: "Average Temperature (Celsius)", key: "averageTemperature" },
  ];

  return (
    <div className="daily-weather-list">
      <h3>
        Average temperatures for latitude: {latitude} and longitude: {longitude}
      </h3>
      <div className="daily-weather-list__headers">
        <div className="daily-weather-list__header">
          <p className="daily-weather-list__header-text">Date</p>
        </div>
        <div className="daily-weather-list__header">
          <p className="daily-weather-list__header-text">Average Temperature</p>
        </div>
      </div>
      <div className="daily-weather-list__content">{dailyWeatherDataList}</div>
      <div className="daily-weather-list__csv-link-wrapper">
      <CSVLink
        data={dailyWeatherData}
        headers={csvHeaders}
        filename={csvFileName}
        className="daily-weather-list__csv-link"
      >
        Download CSV with results
      </CSVLink></div>
    </div>
  );
}
