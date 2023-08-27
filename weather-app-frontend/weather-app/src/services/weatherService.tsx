import axios, { AxiosError } from "axios";
import { CoordinatesFormData } from "../types/CoordinatesFormData";
import { createImportSpecifier } from "typescript";

export const getWeatherData = async (
  coordinatesFormData: CoordinatesFormData
) => {
  const config = {
    params: {
      latitude: coordinatesFormData.latitude,
      longitude: coordinatesFormData.longitude,
    },
  };

  try {
    const result = await axios.get(
      "https://localhost:7145/api/Weather",
      config
    );
    return result.data;
  } catch (err) {
    if (err instanceof AxiosError) {
        if (err.response) {
          throw new Error(err.response.data.message);
        } else {
          throw new Error(err.message);
        }
      }
  }
};
