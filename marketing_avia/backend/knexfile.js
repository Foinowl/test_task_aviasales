module.exports = {
	development: {
		client: "pg",
		connection: {
			host: "localhost",
			port: "5432",
			database: "aviasales",
			user: "postgres",
			password: "admin",
		},
		migrations: {
			tableName: "knex_migrations",
			directory: `${__dirname}/db/migrations`,
		},
	},

	production: {
		client: "postgresql",
		connection: "postgres://localhost:5432/aviasales",
	},
}
