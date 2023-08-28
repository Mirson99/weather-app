using Microsoft.AspNetCore.Mvc;
using System.Globalization;
namespace WeatherApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WeatherController : ControllerBase
{
    private readonly IWeatherService _weatherService;

    public WeatherController(IWeatherService weatherService)
    {
        _weatherService = weatherService;
    }

    [HttpGet()]
    public async Task<IActionResult> GetWeatherData(float latitude, float longitude)
    {
        try
        {
            CultureInfo cultureInfo = new CultureInfo("en-US");
            string sendLatitude = latitude.ToString("0.00", cultureInfo);
            string sendLongitude = longitude.ToString("0.00", cultureInfo);
            
            var weatherData = await _weatherService.GetWeatherDataAsync(sendLatitude, sendLongitude);
            var dailyAverages = _weatherService.CalculateDailyAverages(weatherData);

            return Ok(dailyAverages);
        }
        catch (WeatherApiException ex)
        {
            return StatusCode(ex.ErrorCode, new { message = ex.Message });
        }
    }
}