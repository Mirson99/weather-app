public class WeatherApiResponse
{
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public required HourlyData Hourly { get; set; }
}