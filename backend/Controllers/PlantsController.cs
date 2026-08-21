using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlantsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PlantsController(AppDbContext context)
        {
            _context = context;
        }

        // Hent alle planter for en bruker
        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<Plant>>> GetPlants(int userId)
        {
            return await _context.Plants
                .Where(p => p.UserId == userId)
                .Include(p => p.Species)
                .ToListAsync();
        }

        // Hent én plante
        [HttpGet("{userId}/{id}")]
        public async Task<ActionResult<Plant>> GetPlant(int userId, int id)
        {
            var plant = await _context.Plants
                .Include(p => p.Species)
                .FirstOrDefaultAsync(p => p.Id == id && p.UserId == userId);

            if (plant == null) return NotFound();
            return plant;
        }

        // Opprett plante
        [HttpPost]
        public async Task<ActionResult<Plant>> CreatePlant(Plant plant)
        {
            plant.CreatedAt = DateOnly.FromDateTime(DateTime.UtcNow);
            _context.Plants.Add(plant);
            await _context.SaveChangesAsync();
            return Ok(plant);
        }

        // Oppdater plante
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePlant(int id, Plant plant)
        {
            if (id != plant.Id) return BadRequest();
            _context.Entry(plant).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // Slett plante
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlant(int id)
        {
            var plant = await _context.Plants.FindAsync(id);
            if (plant == null) return NotFound();
            _context.Plants.Remove(plant);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // Registrer vanning
        [HttpPut("{id}/water")]
        public async Task<IActionResult> WaterPlant(int id)
        {
            var plant = await _context.Plants.FindAsync(id);
            if (plant == null) return NotFound();
            plant.LastWatered = DateOnly.FromDateTime(DateTime.UtcNow);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}