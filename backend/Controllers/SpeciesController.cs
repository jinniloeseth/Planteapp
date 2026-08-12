using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SpeciesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SpeciesController(AppDbContext context)
        {
            _context = context;
        }

        // Hent alle arter
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Species>>> GetAllSpecies()
        {
            return await _context.Species.ToListAsync();
        }

        // Hent én art
        [HttpGet("{id}")]
        public async Task<ActionResult<Species>> GetSpecies(int id)
        {
            var species = await _context.Species.FindAsync(id);
            if (species == null) return NotFound();
            return species;
        }
    }
}