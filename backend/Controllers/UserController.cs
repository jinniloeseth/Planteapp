using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(User user)
        {
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Username == user.Username);
            if (existingUser != null)
                return BadRequest("Brukernavn er allerede tatt.");

            // Passord-hashing kommer senere
            _context.Users.Add(user);

            // Opprett standard UserSettings for ny bruker
            var settings = new UserSettings
            {
                UserId = user.Id,
                ShowName = true,
                ShowLocation = false,
                ShowPurchaseDate = false,
                ShowNotes = false,
            };
            _context.UserSettings.Add(settings);

            await _context.SaveChangesAsync();
            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(User user)
        {
            var existingUser = await _context.Users.FirstOrDefaultAsync(u =>
                u.Username == user.Username &&
                u.PasswordHash == user.PasswordHash);

            if (existingUser == null)
                return Unauthorized("Feil brukernavn eller passord.");

            return Ok(existingUser);
        }
    }
}