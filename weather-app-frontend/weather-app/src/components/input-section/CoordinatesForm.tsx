import { useForm } from "react-hook-form";
import "./coordinatesForm.css";
import { CoordinatesFormData } from "../../types/CoordinatesFormData";
import { getWeatherData } from "../../services/weatherService";
import { useState } from "react";
import { DailyWeatherData } from "../../types/DailyWeatherData";

interface CoordinatesFormProps {
  returnWeatherData: (
    dailyWeatherDataList: DailyWeatherData[],
    longitude: number,
    latitude: number
  ) => void;
}

export default function CoordinatesForm({
  returnWeatherData,
}: CoordinatesFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CoordinatesFormData>();

  const [weatherError, setWeatherError] = useState<string>("");

  const onSubmit = async (coordinatesFormData: CoordinatesFormData) => {
    getWeatherData(coordinatesFormData)
      .then((dailyWeatherDataList: DailyWeatherData[]) => {
        returnWeatherData(
          dailyWeatherDataList,
          coordinatesFormData.longitude,
          coordinatesFormData.latitude
        );
        setWeatherError("");
      })
      .catch((error) => {
        setWeatherError(error.message);
      });
  };

  return (
    <div className="coordinates-form-wrapper">
      <form className="coordinates-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="coordinates-form__input-section">
          <div className="coordinates-form__input-box">
            <label className="coordinates-form__label">Latitude</label>
            <input
              type="number"
              className="coordinates-form__input"
              placeholder="Latitude"
              step="0.01"
              {...register("latitude", { required: true })}
            />
            {errors.latitude && (
              <span className="coordinates-form__error">
                This field is required
              </span>
            )}
          </div>
          <div className="coordinates-form__input-box">
            <label className="coordinates-form__label">Longitude</label>
            <input
              type="number"
              className="coordinates-form__input"
              placeholder="Longitude"
              step="0.01"
              {...register("longitude", { required: true })}
            />
            {errors.longitude && (
              <span className="coordinates-form__error">
                This field is required
              </span>
            )}
          </div>
        </div>
        <div className="coordinates-form__button-section">
          <button className="coordinates-form__button" type="submit">
            Get Weather Data
          </button>
          {weatherError && (
            <p className="coordinates-form__error">{weatherError}</p>
          )}
        </div>
      </form>
    </div>
  );
}
