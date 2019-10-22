// Update with your config settings.
require("dotenv").config();

const localPg = {
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
};

const pg = require("pg");
pg.defaults.ssl = false;

const dbConnection = process.env.DATABASE_URL;

module.exports = {
	development: {
		client: "pg",
		connection: {
			host: localPg.host,
			user: localPg.user,
			password: localPg.password,
			database: localPg.database,
			charset: "utf8",
		},
		migrations: {
			directory: "./knex/migrations",
		},
		seeds: {
			directory: "./knex/seeds",
		},

		// client: "sqlite3",
		// connection: {
		// 	filename: "./knex/ppsr.db3",
		// },
		// migrations: {
		// 	directory: "./knex/migrations",
		// },
		// seeds: {
		// 	directory: "./knex/seeds",
		// },
	},

	staging: {
		client: "postgresql",
		connection: {
			database: "my_db",
			user: "username",
			password: "password",
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: "knex_migrations",
		},
	},

	production: {
		client: "pg",
		connection: dbConnection,
		migrations: {
			directory: "./knex/migrations",
		},
		seeds: {
			directory: "./knex/seeds",
		},
	},
};
