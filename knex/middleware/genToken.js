const { jwt } = require("../../configMW/configMW.js");

module.exports = {
	genToken(user) {
		const payload = {
			username: user.username,
			userRole: user.userRole,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			id: user.id,
		};
		const secret = process.env.JWT_SECRET;
		const options = {
			expiresIn: "1h",
		};

		return jwt.sign(payload, secret, options);
	},
};
