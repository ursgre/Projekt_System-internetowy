const Sequelize = require("sequelize");
const sequelize = require("../databaseConfig");
const users = require("./users");

const grades = sequelize.define(
	"oceny",
	{
		uzytkownicyId: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		polski: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		matematyka: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		angielski: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		historia: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		przyroda: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		fizyka: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		wf: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		religia: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

grades.belongsTo(users);

module.exports = grades;
