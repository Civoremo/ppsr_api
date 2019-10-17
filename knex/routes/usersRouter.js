const { express, bcrypt } = require("../../configMW/configMW.js");
const { genToken } = require("../middleware/genToken.js");
const { protected } = require("../middleware/protectedMW.js");

const userDB = require("../helpers/usersDB.js");
const router = express.Router();

router.get("/all", (req, res) => {
	userDB
		.getAllUsers()
		.then(users => {
			res.status(200).json(users);
		})
		.catch(err => {
			res.status(500).json(err, { error: "Failed to load users" });
		});
});

module.exports = router;
