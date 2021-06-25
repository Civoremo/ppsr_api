exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex('altScreens').del().then(function() {
		// Inserts seed entries
		return knex('altScreens').insert([
			// Dome Door Panel
			{
				altScreenName: 'TuffScreen',
				price: 70,
				cageId: 1
			},
			{
				altScreenName: 'Florida Glass',
				price: 70,
				cageId: 1
			},
			{
				altScreenName: 'NoSeeUms Screen',
				price: 65,
				cageId: 1
			},
			{
				altScreenName: 'Pet Screen',
				price: 85,
				cageId: 1
			},

			// Dome Bottom Panel
			{
				altScreenName: 'TuffScreen',
				price: 70,
				cageId: 2
			},
			{
				altScreenName: 'Florida Glass',
				price: 70,
				cageId: 2
			},
			{
				altScreenName: 'NoSeeUms Screen',
				price: 65,
				cageId: 2
			},
			{
				altScreenName: 'Pet Screen',
				price: 85,
				cageId: 2
			},

			// Dome Side Panel
			{
				altScreenName: 'TuffScreen',
				price: 70,
				cageId: 3
			},
			{
				altScreenName: 'Florida Glass',
				price: 70,
				cageId: 3
			},
			{
				altScreenName: 'NoSeeUms Screen',
				price: 65,
				cageId: 3
			},

			// Dome Riser Panel
			{
				altScreenName: 'TuffScreen',
				price: 70,
				cageId: 4
			},
			{
				altScreenName: 'NoSeeUms Screen',
				price: 65,
				cageId: 4
			},

			// Dome Roof Panel
			{
				altScreenName: 'TuffScreen',
				price: 70,
				cageId: 5
			},
			{
				altScreenName: 'NoSeeUms Screen',
				price: 65,
				cageId: 5
			},

			////////////////////////////////////////
			// Gable Door Panel
			{
				altScreenName: 'TuffScreen',
				price: 70,
				cageId: 6
			},
			{
				altScreenName: 'Florida Glass',
				price: 70,
				cageId: 6
			},
			{
				altScreenName: 'NoSeeUms Screen',
				price: 65,
				cageId: 6
			},
			{
				altScreenName: 'Pet Screen',
				price: 85,
				cageId: 6
			},

			// Gable Bottom Panel
			{
				altScreenName: 'TuffScreen',
				price: 70,
				cageId: 7
			},
			{
				altScreenName: 'Florida Glass',
				price: 70,
				cageId: 7
			},
			{
				altScreenName: 'NoSeeUms Screen',
				price: 65,
				cageId: 7
			},
			{
				altScreenName: 'Pet Screen',
				price: 85,
				cageId: 7
			},

			// Gable Side Panel
			{
				altScreenName: 'TuffScreen',
				price: 70,
				cageId: 8
			},
			{
				altScreenName: 'Florida Glass',
				price: 70,
				cageId: 8
			},
			{
				altScreenName: 'NoSeeUms Screen',
				price: 65,
				cageId: 8
			},

			// Gable Low Riser Panel
			{
				altScreenName: 'TuffScreen',
				price: 70,
				cageId: 9
			},
			{
				altScreenName: 'NoSeeUms Screen',
				price: 65,
				cageId: 9
			},

			// Gable High Riser Panel
			{
				altScreenName: 'TuffScreen',
				price: 70,
				cageId: 10
			},
			{
				altScreenName: 'NoSeeUms Screen',
				price: 65,
				cageId: 10
			},

			// Gable Low Roof Panel
			{
				altScreenName: 'TuffScreen',
				price: 70,
				cageId: 11
			},
			{
				altScreenName: 'NoSeeUms Screen',
				price: 65,
				cageId: 11
			},

			// Gable High Roof Panel
			{
				altScreenName: 'TuffScreen',
				price: 70,
				cageId: 12
			},
			{
				altScreenName: 'NoSeeUms Screen',
				price: 65,
				cageId: 12
			}
		]);
	});
};
