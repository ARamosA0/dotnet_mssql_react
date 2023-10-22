using Microsoft.EntityFrameworkCore;
using WebApiEntityFrameworkDockerSqlServer.Data;

var  policyName = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: policyName,
                      builder =>
                      {
                          builder
                            .WithOrigins("*") // specifying the allowed origin
                            .WithMethods("GET") // defining the allowed HTTP method
                            .AllowAnyHeader(); // allowing any header to be sent
                      });
});


builder.Services.AddControllers();

builder.Services.AddDbContext<SalesContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("SalesDb")));

var app = builder.Build();

using(var scope = app.Services.CreateScope())
{
    var salesContext = scope.ServiceProvider.GetRequiredService<SalesContext>();
    salesContext.Database.EnsureCreated();
    salesContext.Seed();
}

// Configure the HTTP request pipeline.

app.UseCors(policyName);
app.UseAuthorization();
app.MapControllers();
app.Run();
