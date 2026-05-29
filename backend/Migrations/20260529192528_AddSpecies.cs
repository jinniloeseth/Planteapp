using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddSpecies : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Species",
                table: "Plants");

            migrationBuilder.DropColumn(
                name: "WateringIntervalDays",
                table: "Plants");

            migrationBuilder.AddColumn<int>(
                name: "SpeciesId",
                table: "Plants",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Species",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    WateringIntervalDays = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Species", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Plants_SpeciesId",
                table: "Plants",
                column: "SpeciesId");

            migrationBuilder.AddForeignKey(
                name: "FK_Plants_Species_SpeciesId",
                table: "Plants",
                column: "SpeciesId",
                principalTable: "Species",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Plants_Species_SpeciesId",
                table: "Plants");

            migrationBuilder.DropTable(
                name: "Species");

            migrationBuilder.DropIndex(
                name: "IX_Plants_SpeciesId",
                table: "Plants");

            migrationBuilder.DropColumn(
                name: "SpeciesId",
                table: "Plants");

            migrationBuilder.AddColumn<string>(
                name: "Species",
                table: "Plants",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "WateringIntervalDays",
                table: "Plants",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }
    }
}
