namespace WebApplication1
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class MapModel : DbContext
    {
        public MapModel()
            : base("name=MapModel")
        {
        }

        public virtual DbSet<AcademicPaper> AcademicPaper { get; set; }
        public virtual DbSet<Relation> Relation { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
