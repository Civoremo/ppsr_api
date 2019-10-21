const { express, bcrypt } = require("../../configMW/configMW.js");
const { genToken } = require("../middleware/genToken.js");
const { protected } = require("../middleware/protectedMW.js");

const userDB = require("../helpers/usersDB.js");
const router = express.Router();

function getRandomActivationKey(min, max) {
	Math.floor(Math.random() * (5000 - 1000)) + 1000;
}

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

router.get("/user", (req, res) => {
	const creds = req.body;

	userDB
		.getUserInfo(creds)
		.then(user => {
			res.status(200).json(user);
		})
		.catch(err => {
			res.status(500).json(err, { error: "Failed to load user info" });
		});
});

router.post("/register", (req, res) => {
	const creds = req.body;

	if (creds.password) {
		const hashedPassword = bcrypt.hashSync(creds.password, 14);
		creds.password = hashedPassword;
		creds.activationKey = getRandomActivationKey();

		if (creds.firstName && creds.lastName && creds.email) {
			userDB
				.registerUser(creds)
				.then(id => {
					console.log(id);
					res.status(201).json(id);

					userDB.sendConfirmationKey(creds)
					.then(res => {
						res.status(200).json({message: "Confirmation sent."})
					}).catch(err => {
						res.status(500).json({error: 'Confirmation not sent'})
					})
				})
				.catch(err => {
					res
						.status(500)
						.json(err, { error: "Registration Failed", message: "Email already exists" });
				});
		} else {
			res.status(500).json({ error: "Missing input fields" });
		}
	} else {
		res.status(500).json(err, { message: "Password required" });
	}
});

router.post("/login", (req, res) => {
	const creds = req.body;
	const 

	if (creds.activeUser) {
		userDB
			.loginUser(creds)
			.then(user => {
				if (user && bcrypt.compareSync(creds.password, user.password)) {
					const token = genToken(user);
					res.status(200).json({
						token,
						user: {
							id: user.id,
							firstName: user.firstName,
							lastName: user.lastName,
							userRole: user.userRole,
							email: user.email,
							password: user.password,
							activeUser: user.activeUser,
							activationKey: user.activationKey,
						},
					});
				} else {
					res.status(401).json({ message: "Invalid login info" });
				}
			})
			.catch(err => {
				res.status(500).json(err, { error: "Login failed" });
			});
	} else {
		return "User has not been activated!";
	}
});

router.delete("/delete", protected, (req, res) => {
	console.log(req.decodedToken);
	userDB
		.deleteUser(req.decodedToken)
		.then(count => {
			if (count === 1) {
				res.status(200).json(count);
			} else {
				res.status(404).json(count, { message: " - User failed to delete" });
			}
		})
		.catch(err => {
			res.status(500).json(err, { error: "Failed to delete user" });
		});
});

router.put("/update", protected, (req, res) => {
	const creds = req.body;
	const hashedPassword = bcrypt.hashSync(creds.password, 14);
	creds.password = hashedPassword;

	userDB
		.updateUser(req.decodedToken, creds)
		.then(id => {
			res.status(200).json(id);
		})
		.catch(err => {
			res.status(500).json({ err, error: "Failed to update user." });
		});
});

router.put("/confirmUser", (req, res) => {
	const creds = req.body;
	const hashedPassword = bcrypt.hashSync(creds.password, 14);
	creds.password = hashedPassword;
	const foundUser = userDB.getUserInfoToConfirmKey(creds);

	if (!foundUser.activeUser) {

		if (foundUser.activationKey === creds.activationKey) {
			userDB
				.updateUser(creds, creds)
				.then(id => {
					res.status(200).json(id);
				})
				.catch(err => {
					res.status(500).json({ err, error: "Account activation failed." });
				});
		}
	} else {
		return "User already activated.";
	}
});

module.exports = router;
