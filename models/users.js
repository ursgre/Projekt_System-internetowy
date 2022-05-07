const Sequelize = require("sequelize");
const sequelize = require("../databaseConfig");

const users = sequelize.define(
	"users",
	{
		username: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: false,
	}
);

module.exports = users;
