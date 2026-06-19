namespace backend.Models
{
    public class Plant
    {
        public int Id { get; set; }
        public string? Name { get; set; } = string.Empty;
        public string? Location { get; set; }
        public string? Notes { get; set; }
        public DateTime? LastWatered { get; set; }
        public int? SpeciesId { get; set; }
        public Species? Species { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}