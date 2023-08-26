using System.Text.Json.Serialization;

public class HourlyData
{
    [JsonPropertyName("time")]
    public required List<string> Time { get; set; } 

    [JsonPropertyName("temperature_2m")]
    public required List<double> Temperature { get; set; }
}