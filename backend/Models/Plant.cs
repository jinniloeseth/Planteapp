namespace backend.Models
{
    public class Plant
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Location { get; set; }
        public string? Notes { get; set; }
        public DateTime? LastWatered { get; set; }
        public DateTime? PurchaseDate { get; set; }
        public int WateringIntervalDays { get; set; } = 0;
        public int? SpeciesId { get; set; }
        public Species? Species { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Kobling til bruker
        public int UserId { get; set; }
        public User? User { get; set; }
    }
}