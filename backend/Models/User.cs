namespace backend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;

        public UserSettings? Settings { get; set; }
        public List<Plant> Plants { get; set; } = new List<Plant>();
    }
}