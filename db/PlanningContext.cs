using db.Models.BaseModels;
using Microsoft.EntityFrameworkCore;

namespace db
{
    public class PlanningContext : DbContext
    {
        public DbSet<Plan> Plans { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Status> Statuses { get; set; }

        public PlanningContext(DbContextOptions<PlanningContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
    }
}