exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex('cages').del().then(function() {
		// Inserts seed entries
		return knex('cages').insert([
			// Dome Seed
			{
				cageType: 'Dome',
				cagePart: 'Door',
				price: 40
			},
			{
				cageType: 'Dome',
				cagePart: 'Bottom',
				price: 50
			},
			{
				cageType: 'Dome',
				cagePart: 'Side',
				price: 60
			},
			{
				cageType: 'Dome',
				cagePart: 'Riser',
				price: 70
			},
			{
				cageType: 'Dome',
				cagePart: 'Roof',
				price: 80
			},
			// Gable Seed
			{
				cageType: 'Gable',
				cagePart: 'Door',
				price: 40
			},
			{
				cageType: 'Gable',
				cagePart: 'Bottom',
				price: 50
			},
			{
				cageType: 'Gable',
				cagePart: 'Side',
				price: 60
			},
			{
				cageType: 'Gable',
				cagePart: 'Riser',
				price: 70
			},
			{
				cageType: 'Gable',
				cagePart: 'Roof',
				price: 80
			}
		]);
	});
};
