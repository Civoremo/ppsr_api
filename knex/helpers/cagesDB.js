const db = require('../knex.js');

module.exports = {
	getAllCages,
	getCageById
};

function getAllCages() {
	const altScreens = db('altScreens').select('id', 'altScreenName', 'price', 'cageId');
	const cages = db('cages').select('id', 'cageType', 'cagePart', 'price', 'imageURL');

	return Promise.all([ cages, altScreens ]).then((result) => {
		let combinedCageData = [];

		for (let cageItem of result[0]) {
			let combinedAltScreens = [];
			for (let altScreenItem of result[1]) {
				if (altScreenItem.cageId === cageItem.id) {
					combinedAltScreens.push(altScreenItem);
				}
			}
			combinedCageData.push({ ...cageItem, altScreenOptions: combinedAltScreens });
		}
		return combinedCageData;
	});
}

function getCageById(Id) {
	const altScreens = db('altScreens').select('id', 'altScreenName', 'price', 'cageId');
	const cage = db('cages').where({ id: Id }).select('id', 'cageType', 'cagePart', 'price', 'imageURL');

	return Promise.all([ cage, altScreens ]).then((result) => {
		let otherScreens = [];

		for (let screen of result[1]) {
			if (screen.cageId === result[0][0].id) {
				otherScreens.push(screen);
			}
		}

		result[0][0].altScreenOptions = otherScreens;
		return result[0][0];
	});
}
