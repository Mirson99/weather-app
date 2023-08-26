public interface IWeatherService
{
    List<DailyWeatherData> CalculateDailyAverages(WeatherApiResponse weatherData);
    Task<WeatherApiResponse> GetWeatherDataAsync(double latitude, double longitude);
}