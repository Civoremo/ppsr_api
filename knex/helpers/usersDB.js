const db = require("../knex.js");

module.exports = {
	getAllUsers,
	registerUser,
	loginUser,
	getUserInfo,
	deleteUser,
};

function getAllUsers() {
	return db("users").select("id", "firstName", "lastName", "userRole", "email", "password");
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
		.select("id", "firstName", "lastName", "userRole", "email", "password")
		.where({ email: user.email });
}

function deleteUser(user) {
	return db("users")
		.where({ email: user.email })
		.del();
}
