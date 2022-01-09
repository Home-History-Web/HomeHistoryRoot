using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace HomeHistoryApi.Models
{
    public class HomeHistoryContext : DbContext
    {
        public HomeHistoryContext(DbContextOptions<HomeHistoryContext> options)
            : base(options)
        {
        }

        public DbSet<HomeHistoryItem> HomeHistoryItems { get; set; } = null!;
    }
}