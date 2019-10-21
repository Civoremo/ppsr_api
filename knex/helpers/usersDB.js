const db = require("../knex.js");

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
}
