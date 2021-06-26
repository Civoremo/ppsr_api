const { express } = require('../../configMW/configMW.js');
const { adminProtected } = require('../middleware/protectedMW.js');

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

router.get('/:id', adminProtected, (req, res) => {
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

router.put('/:id/cage/update', adminProtected, (req, res) => {
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

router.put('/screen/:screenId/update', adminProtected, (req, res) => {
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

router.post('/:cageId/screen/post', adminProtected, (req, res) => {
	const cageId = req.params.cageId;
	const screenData = req.body;

	cageDB
		.addAltScreenToCage(cageId, screenData)
		.then((altScreen) => {
			res.status(200).json(1);
		})
		.catch((err) => {
			res.status(500).json({ err, error: 'Failed to add alt screen to cage info.' });
		});
});

router.delete('/screen/:screenId/delete', adminProtected, (req, res) => {
	const screenId = req.params.screenId;

	cageDB
		.deleteAltScreenFromCage(screenId)
		.then((removedScreen) => {
			res.status(200).json(removedScreen);
		})
		.catch((err) => {
			res.status(500).json({ err, error: 'Failed to remove alt screen.' });
		});
});

module.exports = router;
