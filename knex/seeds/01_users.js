const bcrypt = require("bcryptjs");

exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return (
		knex("users")
			// .del()
			.then(function(knex) {
				// Inserts seed entries
				return knex("users").insert([
					{
						firstName: "Netko",
						lastName: "O",
						userRole: "user",
						email: "netkotest@test.com",
						password: bcrypt.hashSync("testPassword", 14),
					},
					{
						firstName: "Ajla",
						lastName: "O",
						userRole: "user",
						email: "ajlatest@test.com",
						password: bcrypt.hashSync("testPassword", 14),
					},
					{
						firstName: "Merima",
						lastName: "O",
						userRole: "user",
						email: "merimatest@test.com",
						password: bcrypt.hashSync("testPassword", 14),
					},
					{
						firstName: "Sajo",
						lastName: "O",
						userRole: "user",
						email: "sajotest@test.com",
						password: bcrypt.hashSync("testPassword", 14),
					},
					{
						firstName: "Tania",
						lastName: "O",
						userRole: "admini",
						email: "taniatest@test.com",
						password: bcrypt.hashSync("testPassword", 14),
					},
				]);
			})
	);
};
