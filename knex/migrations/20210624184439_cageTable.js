exports.up = function(knex, Promise) {
	return knex.schema.createTable('cages', (tbl) => {
		tbl.increments('id');
		tbl.enu('cageType', [ 'Dome', 'Gable' ]).notNullable();
		tbl
			.enu('cagePart', [
				'Door',
				'Bottom',
				'Side',
				'Riser',
				'Roof',
				'Low Riser',
				'High Riser',
				'Low Roof',
				'High Roof'
			])
			.notNullable();
		tbl.integer('price').notNullable();
		tbl
			.text('imageURL')
			.defaultTo(
				'https://lh3.googleusercontent.com/TH8_ltVwDKPJr9_Gx1-HnowDmka1lBAv8p0WwP68aBNU_59jM_nC27HuN9nndBljCrod=s170'
			)
			.notNullable();
		tbl.timestamps(true, true);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('cages');
};
