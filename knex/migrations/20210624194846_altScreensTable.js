exports.up = function(knex, Promise) {
	return knex.schema.createTable('altScreens', (tbl) => {
		tbl.increments('id');
		tbl.enu('altScreenName', [ 'TuffScreen', 'Florida Glass', 'NoSeeUms Screen', 'Pet Screen' ]).notNullable();
		tbl.integer('price').notNullable();
		tbl.integer('cageId').unsigned().references('id').inTable('cages').notNullable();
		tbl.timestamps(true, true);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('altScreens');
};
