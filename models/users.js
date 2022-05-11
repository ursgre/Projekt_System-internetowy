const Sequelize = require("sequelize");
const sequelize = require("../databaseConfig");

const users = sequelize.define(
	"uzytkownicy",
	{
		imie: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		nazwisko: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		haslo: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		rola: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

module.exports = users;
