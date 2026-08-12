using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserSettingsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserSettingsController(AppDbContext context)
        {
            _context = context;
        }

        // Hent innstillinger for en bruker
        [HttpGet("{userId}")]
        public async Task<ActionResult<UserSettings>> GetUserSettings(int userId)
        {
            var settings = await _context.UserSettings
                .FirstOrDefaultAsync(s => s.UserId == userId);

            if (settings == null) return NotFound();
            return settings;
        }

        // Oppdater innstillinger
        [HttpPut("{userId}")]
        public async Task<IActionResult> UpdateUserSettings(int userId, UserSettings settings)
        {
            if (userId != settings.UserId) return BadRequest();

            _context.Entry(settings).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}