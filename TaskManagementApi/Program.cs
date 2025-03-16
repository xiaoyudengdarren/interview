using TaskManagementApi.Data;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddSingleton<TaskContext>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost3000", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Allow requests from this origin
              .AllowAnyHeader() // Allow any header
              .AllowAnyMethod(); // Allow any HTTP method (GET, POST, etc.)
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();
app.UseCors("AllowLocalhost3000");
app.UseAuthorization();
app.MapControllers();


app.Run();