using Microsoft.EntityFrameworkCore;
using HomeHistoryApi.Models;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<HomeHistoryContext>(opt =>
    opt.UseInMemoryDatabase("HomeHistoryList"));

builder.Services.AddSwaggerGen(c =>
{
   c.SwaggerDoc("v1", new() { Title = "HomeHistory", Version = "v1" });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (builder.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "HomeHistory v1"));
}

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();