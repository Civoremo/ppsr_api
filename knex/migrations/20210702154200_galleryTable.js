/** @format */

exports.up = function (knex, Promise) {
  return knex.schema.createTable("gallery", tbl => {
    tbl.increments("id");
    tbl.text("imageURL").notNullable();
    tbl.timestamps(true, true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists("gallery");
};
