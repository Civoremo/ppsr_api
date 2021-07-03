/** @format */

exports.up = function (knex, Promise) {
  return knex.schema.createTable("cages", tbl => {
    tbl.increments("id");
    tbl.enu("cageType", ["Dome", "Gable"]).notNullable();
    tbl
      .enu("cagePart", [
        "Door",
        "Bottom",
        "Side",
        "Riser",
        "Roof",
        "Low Riser",
        "High Riser",
        "Low Roof",
        "High Roof",
      ])
      .notNullable();
    tbl.integer("price").notNullable();
    tbl
      .text("imageURL")
      .defaultTo(
        "https://res.cloudinary.com/ppscreens/image/upload/v1625272035/ppsr_images/eayruylhls9jizwmo8dz.jpg"
      )
      .notNullable();
    tbl.timestamps(true, true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists("cages");
};
