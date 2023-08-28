public interface IWeatherService
{
    List<DailyWeatherData> CalculateDailyAverages(WeatherApiResponse weatherData);
    Task<WeatherApiResponse> GetWeatherDataAsync(string latitude, string longitude);
}