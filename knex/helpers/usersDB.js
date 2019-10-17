const db = require("../knex.js");

module.exports = {
	getAllUsers,
};

function getAllUsers() {
	return db("users").select("id", "firstName", "lastName", "email", "password");
}
