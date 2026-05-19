namespace backend.Models
{
    public class Plant
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Species { get; set; }
        public string? Location { get; set; }
        public string? Notes { get; set; }
        public DateTime? LastWatered { get; set; }
        public int WateringIntervalDays { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}