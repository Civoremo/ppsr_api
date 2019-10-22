const db = require("../knex.js");
const { sgMail } = require("../../configMW/configMW.js");

module.exports = {
	getAllUsers,
	registerUser,
	loginUser,
	getUserInfo,
	deleteUser,
	updateUser,
	confirmUser,
	getUserInfoToConfirmKey,
	sendConfirmationKey,
};

function getAllUsers() {
	return db("users").select(
		"id",
		"firstName",
		"lastName",
		"userRole",
		"email",
		"password",
		"activeUser",
		"activationKey"
	);
}

function registerUser(user) {
	return db("users").insert(user);
}

function loginUser(user) {
	return db("users")
		.where({ email: user.email })
		.first();
}

function getUserInfo(user) {
	return db("users")
		.select(
			"id",
			"firstName",
			"lastName",
			"userRole",
			"email",
			"password",
			"activeUser"
			// "activationKey"
		)
		.where({ email: user.email });
}

function getUserInfoToConfirmKey(user) {
	return db("users")
		.select("id", "activeUser", "activationKey")
		.where({ email: user.email });
}

function deleteUser(user) {
	return db("users")
		.where({ email: user.email })
		.del();
}

function updateUser(user, updatedUserInfo) {
	return db("users")
		.where({ id: user.id })
		.update(updatedUserInfo);
}

function confirmUser(user) {
	return db("users")
		.where({ email: user.email })
		.update({ activeUser: true });
}

function sendConfirmationKey(user) {
	// sendgrid code goes here
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);

	const msg = {
		to: `${user.email}`,
		from: `ppsr@ppscreens.com`,
		subject: "PPSR Confirmation Key",
		html: `Thank you for registering with Pool & Patio Screen Repair website.<br>
		If this email was not meant for you, please ignore its contents and delete.<br><br>
		Your Confirmation Number:<br>
		<strong>${user.activationKey}</strong>
		`,
	};

	return sgMail.send(msg);
}
