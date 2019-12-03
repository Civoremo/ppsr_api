const { express, bcrypt } = require("../../configMW/configMW.js");
const { genToken } = require("../middleware/genToken.js");
const { protected } = require("../middleware/protectedMW.js");

const userDB = require("../helpers/usersDB.js");
const router = express.Router();

const axios = require("axios");

function getRandomActivationKey(min, max) {
	return Math.floor(Math.random() * (9876 - 1234)) + 1234;
}

router.get("/all", (req, res) => {
	userDB
		.getAllUsers()
		.then(users => {
			res.status(200).json(users);
		})
		.catch(err => {
			res.status(500).json(err, { message: "Failed to load users" });
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
			res.status(500).json(err, { message: "Failed to load user info" });
		});
});

router.post("/register", (req, res) => {
	const creds = req.body;

	if (creds.password) {
		const hashedPassword = bcrypt.hashSync(creds.password, 14);
		creds.password = hashedPassword;
		creds.activationKey = getRandomActivationKey();

		// console.log("Random Activation Key:");
		// console.log(`${creds.activationKey}`);

		if (creds.firstName && creds.lastName && creds.email) {
			userDB
				.registerUser(creds)
				.then(ids => {
					// console.log(ids);
					// res.status(201).json(1);

					const sendEmail = userDB
						.sendConfirmationKey(creds)
						.then(result => {
							console.log(result);
							res.status(201).json({ registered: 1, message: "Confirmation key email sent." });
						})
						.catch(err => {
							res.status(450).json(err, { registered: 0, message: "Confirmation not sent" });
						});
				})
				.catch(err => {
					res
						.status(500)
						.json(err, { registered: 2, message: "Registration Failed; email already exists" });
				});
		} else {
			res.status(500).json({ registered: 3, message: "Missing input fields" });
		}
	} else {
		res.status(500).json(err, { registered: 4, message: "Password required" });
	}
});

router.post("/login", (req, res) => {
	const creds = req.body;
	userDB
		.getUserInfo(creds)
		.then(foundUser => {
			// console.log("USER: ", foundUser[0].activeUser);
			if (foundUser[0].activeUser === true) {
				// console.log("active user status is TRUE");
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
							res.status(404).json({ login: 1, message: "Invalid login info" });
						}
					})
					.catch(err => {
						res.status(500).json(err, { login: 0, message: "Login failed" });
					});
			} else {
				res.status(500).json({ login: 3, message: "User has not been confirmed." });
			}
		})
		.catch(err => {
			res.status(500).json({ login: 4, message: "Something went wrong during Login." });
		});
});

router.delete("/delete", protected, (req, res) => {
	// console.log(req.decodedToken);
	userDB
		.deleteUser(req.decodedToken)
		.then(count => {
			if (count === 1) {
				res.status(200).json(count, { delted: 1 });
			} else {
				res.status(404).json(count, { deleted: 0, message: " - User failed to delete" });
			}
		})
		.catch(err => {
			res.status(500).json(err, { delted: 2, message: "Failed to delete user" });
		});
});

router.put("/update", protected, (req, res) => {
	const creds = req.body;
	// const hashedPassword = bcrypt.hashSync(creds.password, 14);
	// creds.password = hashedPassword;

	userDB
		.updateUser(req.decodedToken, creds)
		.then(id => {
			res.status(200).json(id, { updated: 1 });
		})
		.catch(err => {
			res.status(500).json(err, { updated: 0, message: "Failed to update user." });
		});
});

router.put("/confirmUser", (req, res) => {
	const creds = req.body;
	// const hashedPassword = bcrypt.hashSync(creds.password, 14);
	// creds.password = hashedPassword;
	userDB
		.getUserInfoToConfirmKey(creds)
		.then(foundUser => {
			if (!foundUser[0].activeUser) {
				if (foundUser[0].activationKey === creds.activationKey) {
					userDB
						.confirmUser(creds, creds)
						.then(id => {
							res.status(200).json(id, { activeted: 1 });
						})
						.catch(err => {
							res.status(500).json(err, { activated: 0, message: "Account activation failed." });
						});
				} else {
					res.status(500).json({ activated: 2, message: "Incorrect Activation Key." });
				}
			} else {
				res.status(500).json({ activated: 3, message: "User is already actived." });
			}
		})
		.catch(err => {
			res.status(500).json({ activated: 4, message: "Could not find user." });
		});
});

router.post("/estimate", (req, res) => {
	const info = req.body;
	console.log("estimate: " + JSON.stringify(info));

	userDB
		.sendEstimateRequest(info)
		.then(response => {
			res.status(200).json(response, { estimateSent: 1 });
		})
		.catch(err => {
			res.status(500).json(err, { estimateSent: 0 });
		});
});

router.get("/recaptchaPPSR", (req, res) => {
	const info = req.body;
	console.log("REQ " + JSON.stringify(info));
	console.log("recaptcha post body: " + `${info.response}`);

	// userDB
	// 	.recatpchaRequest(info)
	// 	.then(response => {
	// 		res.status(200).json(response, { recaptchaRequest: 1 });
	// 	})
	// 	.catch(err => {
	// 		res.status(500).json(err, { recaptchaRequest: 0 });
	// 	});
	// fetch("https://www.google.com/recaptcha/api/siteverify", {
	// 	method: "POST",
	// 	// mode: 'no-cors',
	// 	// headers: {
	// 	//   'Content-Type': 'application/x-www-form-urlencoded'
	// 	// },
	// 	// headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
	// 	body: JSON.stringify({
	// 		secret: `${process.env.REACT_APP_CAPTCHASECRET}`,
	// 		response: `${info.response}`,
	// 		// remoteip: 'localhost'
	// 	}),
	// })
	// 	.then(res => {
	// 		console.log(res);
	// 		// return res;
	// 		res.status(200).json(res, { reCaptchaResponse: 1 });
	// 	})
	// 	.catch(err => {
	// 		console.log("error " + err);
	// 		// return err;
	// 		res.status(500).json(err, { reCaptchaResponse: 0 });
	// 	});

	axios({
		method: "post",
		url: "https://www.google.com/recaptcha/api/siteverify",
		body: JSON.stringify({
			secret: `${process.env.REACT_APP_CAPTCHASECRET}`,
			response: `${info.response}`,
		}),
	})
		.then(res => {
			console.log("success " + JSON.stringify(res));
			res.status(200).json({ result: res, request: "sent" });
		})
		.catch(err => {
			console.log("failed " + JSON.stringify(err));
			res.status(500).json({ error: err, request: "failed" });
		});
});

module.exports = router;
