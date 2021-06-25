const { express } = require('../../configMW/configMW.js');
const { protected } = require('../middleware/protectedMW.js');

const cageDB = require('../helpers/cagesDB.js');
const { route } = require('./usersRouter.js');
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
			res.status(500).json({ err, error: 'Failed to load cage by ID.' });
		});
});

router.put('/:id/cage/update', (req, res) => {
	const cageId = req.params.id;
	const newData = req.body;

	cageDB
		.updateCageById(cageId, newData)
		.then((cage) => {
			res.status(200).json(cage);
		})
		.catch((err) => {
			res.status(500).json({ err, error: 'Failed to update cage data.' });
		});
});

router.put('/screen/:screenId/update', (req, res) => {
	const screenId = req.params.screenId;
	const newData = req.body;

	cageDB
		.updateAltScreenById(screenId, newData)
		.then((altScreen) => {
			res.status(200).json(altScreen);
		})
		.catch((err) => {
			res.status(500).json({ err, error: 'Failed to update alt screen data.' });
		});
});

module.exports = router;
