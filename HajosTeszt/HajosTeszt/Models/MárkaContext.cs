using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;



#nullable disable



namespace HajosTeszt.Models
{
    public partial class MárkaContext : DbContext
    {
        public MárkaContext()
        {
        }



        public MárkaContext(DbContextOptions<MárkaContext> options)
            : base(options)
        {
        }



        public virtual DbSet<Márka> Márkas { get; set; }



        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Data Source=bit.uni-corvinus.hu;Persist Security Info=True;User ID=szamhalo;Password=keszulaleadando");
            }
        }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Hungarian_CI_AS");



            modelBuilder.Entity<Márka>(entity =>
            {
                entity.ToTable("FHK6HB");



                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("id");



                entity.Property(e => e.Manufacturer).IsRequired();
            });



            OnModelCreatingPartial(modelBuilder);
        }



        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
