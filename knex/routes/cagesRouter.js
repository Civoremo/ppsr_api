const { express } = require('../../configMW/configMW.js');
const { protected } = require('../middleware/protectedMW.js');

const cageDB = require('../helpers/cagesDB.js');
const router = express.Router();

router.get('/all', (req, res) => {
	cageDB
		.getAllCages()
		.then((cages) => {
			res.status(200).json(cages);
		})
		.catch((err) => {
			res.status(500).json({ err, error: 'Failed to load cages data.' });
		});
});

module.exports = router;
