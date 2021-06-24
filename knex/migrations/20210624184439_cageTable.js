exports.up = function(knex, Promise) {
	return knex.schema.createTable('cages', (tbl) => {
		tbl.increments('id');
		tbl.enu('cageType', [ 'Dome', 'Gable' ]).notNullable();
		tbl.enu('cagePart', [ 'Door', 'Bottom', 'Side', 'Riser', 'Roof' ]).notNullable();
		tbl.integer('price').notNullable();
		tbl.timestamps(true, true);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('cages');
};
