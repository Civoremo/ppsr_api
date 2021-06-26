const { express } = require('../../configMW/configMW.js');
const router = express.Router();

router.get('/start', (req, res) => {
	try {
		res.status(200).json('Server is up and running.');
	} catch (error) {
		res.status(500).json('Server failed to respond.');
	}
});

module.exports = router;
