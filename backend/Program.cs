using backend.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=planteapp.db"));

var app = builder.Build();

app.UseHttpsRedirection();
app.MapControllers();
app.Run();