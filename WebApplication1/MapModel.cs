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
            //Database.SetInitializer<MapModel>(new CreateDatabaseIfNotExists<MapModel>());
            Database.SetInitializer<MapModel>(new DropCreateDatabaseIfModelChanges<MapModel>());
            //Database.SetInitializer<SchoolDBContext>(new DropCreateDatabaseAlways<SchoolDBContext>());
            //Database.SetInitializer<SchoolDBContext>(new SchoolDBInitializer());
        }

        public virtual DbSet<AcademicPaper> AcademicPaper { get; set; }
        public virtual DbSet<Relation> Relation { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
