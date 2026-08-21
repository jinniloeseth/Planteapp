namespace backend.Models
{
    public class Plant
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Location { get; set; }
        public string? Notes { get; set; }
        public DateOnly? LastWatered { get; set; }
        public DateOnly? PurchaseDate { get; set; }
        public DateOnly CreatedAt { get; set; } = DateOnly.FromDateTime(DateTime.UtcNow);
        public int WateringIntervalDays { get; set; } = 0;
        public int? SpeciesId { get; set; }
        public Species? Species { get; set; }

        // Kobling til bruker
        public int UserId { get; set; }
        public User? User { get; set; }
    }
}