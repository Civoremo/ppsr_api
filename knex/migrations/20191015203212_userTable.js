exports.up = function(knex, Promise) {
	return knex.schema.createTable("users", tbl => {
		tbl.increments("id");
		tbl.string("firstName", 128).notNullable();
		tbl.string("lastName", 128).notNullable();
		tbl.string("userRole").defaultTo("user");
		tbl
			.string("email", 128)
			.unique("email")
			.notNullable();
		tbl.string("password", 255).notNullable();
		tbl
			.boolean("activeUser")
			.defaultTo(false)
			.notNullable();
		tbl
			.integer("activationKey")
			.unsigned()
			.notNullable();
		tbl.timestamps(true, true);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists("users");
};
