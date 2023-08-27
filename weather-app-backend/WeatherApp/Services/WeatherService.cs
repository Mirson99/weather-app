using System.Text.Json;
public class WeatherService : IWeatherService
{
  private readonly HttpClient _httpClient;

  public WeatherService(HttpClient httpClient)
  {
    _httpClient = httpClient;
  }
  public List<DailyWeatherData> CalculateDailyAverages(WeatherApiResponse weatherData)
  {
    Dictionary<DateTime, List<double>> dailyTemperatureSamples = new Dictionary<DateTime, List<double>>();

    for (int i = 0; i < weatherData.Hourly.Time.Count; i++)
    {
      DateTime timestamp = DateTime.Parse(weatherData.Hourly.Time[i]);
      DateTime date = timestamp.Date;

      double temperature = weatherData.Hourly.Temperature[i];

      if (dailyTemperatureSamples.ContainsKey(date))
      {
        dailyTemperatureSamples[date].Add(temperature);
      }
      else
      {
        dailyTemperatureSamples[date] = new List<double> { temperature };
      }
    }

    List<DailyWeatherData> dailyAverages = new List<DailyWeatherData>();

    foreach (var kvp in dailyTemperatureSamples)
    {
      DateTime date = kvp.Key;
      List<double> temperatureSamples = kvp.Value;

      double averageTemperature = Math.Round(temperatureSamples.Average(), 1);

      dailyAverages.Add(new DailyWeatherData
      {
        Date = date.ToString("dd/MM/yyyy"),
        AverageTemperature = averageTemperature
      });
    }

    return dailyAverages;
  }

  public async Task<WeatherApiResponse> GetWeatherDataAsync(double latitude, double longitude)
  {
    string apiUrl = $"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&hourly=temperature_2m";
    string responseBody = "";

    var options = new JsonSerializerOptions
    {
      PropertyNameCaseInsensitive = true
    };

    try
    {
      HttpResponseMessage response = await _httpClient.GetAsync(apiUrl);

      responseBody = await response.Content.ReadAsStringAsync();

      WeatherApiResponse weatherData =
        JsonSerializer.Deserialize<WeatherApiResponse>(responseBody, options) ??
        throw new WeatherApiException("Failed to deserialize weather data.", 400);

      return weatherData;
    }
    catch (HttpRequestException ex)
    {
      throw new WeatherApiException("Błąd połączenia z API pogodowym.", 500, ex);
    }
    catch (JsonException)
    {
      try
      {
        var errorResponse = JsonSerializer.Deserialize<ErrorResponse>(responseBody, options);
        if (errorResponse != null && errorResponse.Error)
        {
          throw new WeatherApiException(errorResponse.Reason, 400);
        }
      }
      catch (JsonException)
      {
        throw new WeatherApiException("Failed to process weather data.", 400);
      }
      throw new WeatherApiException("Failed to process weather data.", 400);
    }
  }
}