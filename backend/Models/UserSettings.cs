namespace backend.Models
{
    public class UserSettings
    {
        public int Id { get; set; }

        

        // Mandatory - ikke nødvendig å ha her siden de alltid er på
        // Men valgfrie felt:

        public bool ShowName { get; set; } = true;
        public bool ShowLocation { get; set; } = false;
        public bool ShowPurchaseDate { get; set; } = false;
        public bool ShowNotes { get; set; } = false;

        // Kobling til bruker
        public int UserId { get; set; }
        public User? User { get; set; }
    }
}