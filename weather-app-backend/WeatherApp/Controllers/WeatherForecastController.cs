using Microsoft.AspNetCore.Mvc;

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
    public async Task<IActionResult> GetWeatherData(double latitude, double longitude)
    {
        try
        {
            var weatherData = await _weatherService.GetWeatherDataAsync(latitude, longitude);
            var dailyAverages = _weatherService.CalculateDailyAverages(weatherData);

            return Ok(dailyAverages);
        }
        catch (WeatherApiException ex)
        {
            return StatusCode(ex.ErrorCode, new { message = ex.Message });
        }
    }
}