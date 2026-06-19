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

        // Hent alle planter
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Plant>>> GetPlants()
        {
            return await _context.Plants
                .Include(p => p.Species)
                .ToListAsync();
        }

        // Hent plante ved en gitt id
        [HttpGet("{id}")]
        public async Task<ActionResult<Plant>> GetPlant(int id)
        {
            var plant = await _context.Plants.FindAsync(id);
            if (plant == null) return NotFound();
            return plant;
        }

        // Opprett plante
        [HttpPost]
        public async Task<ActionResult<Plant>> CreatePlant(Plant plant)
        {
            _context.Plants.Add(plant);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetPlant), new { id = plant.Id }, plant);
        }

        // Oppdater / rediger plante
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePlant(int id, Plant plant)
        {
            if (id != plant.Id) return BadRequest();
            _context.Entry(plant).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // Slette spesifik plante
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlant(int id)
        {
            var plant = await _context.Plants.FindAsync(id);
            if (plant == null) return NotFound();
            _context.Plants.Remove(plant);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // Vann spesifik plante
        [HttpPut("{id}/water")]
        public async Task<IActionResult> WaterPlant(int id)
        {
            var plant = await _context.Plants.FindAsync(id);
            if (plant == null) return NotFound();
            plant.LastWatered = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}