using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace HomeHistoryApi.Models
{
    public class MongoContext : DbContext
    {
        public MongoContext(DbContextOptions<MongoContext> options)
            : base(options)
        {}
    }
}