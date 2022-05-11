const Sequelize = require("sequelize");
const sequelize = require("../databaseConfig");

const contests = sequelize.define(
	"konkursy",
	{
		nazwa: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		data: {
			type: Sequelize.DATE,
			allowNull: false,
		},
		godzina: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		sala: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

module.exports = contests;
