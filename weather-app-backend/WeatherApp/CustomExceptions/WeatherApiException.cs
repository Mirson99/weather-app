public class WeatherApiException : Exception
{
    public int ErrorCode { get; }

    public WeatherApiException(string message, int errorCode) : base(message)
    {
        ErrorCode = errorCode;
    }

    public WeatherApiException(string message, int errorCode, Exception innerException) : base(message, innerException)
    {
        ErrorCode = errorCode;
    }
}
