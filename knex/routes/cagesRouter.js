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

router.get('/:id', (req, res) => {
	const cageId = req.params.id;

	cageDB
		.getCageById(cageId)
		.then((cage) => {
			res.status(200).json(cage);
		})
		.catch((err) => {
			res.status(500).json({ err, error: 'Failed to load Cage by ID.' });
		});
});

module.exports = router;
