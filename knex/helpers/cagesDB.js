const db = require('../knex.js');

module.exports = {
	getAllCages
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
