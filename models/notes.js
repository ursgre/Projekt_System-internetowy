const Sequelize = require("sequelize");
const sequelize = require("../databaseConfig");
const users = require("./users");

const notes = sequelize.define(
	"uwagi",
	{
		uzytkownicyId: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		tresc: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		data: {
			type: Sequelize.DATE,
			allowNull: false,
		},
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

notes.belongsTo(users);

module.exports = notes;
