const db = require("../knex.js");

module.exports = {
	getAllUsers,
};

function getAllUsers() {
	return db("users").select("id", "userName", "firstName", "lastName", "email");
}
