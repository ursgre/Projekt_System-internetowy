const Sequelize = require("sequelize");
const sequelize = require("../databaseConfig");
const users = require("./users");

const tools = sequelize.define(
	"tools",
	{
		username: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: false,
	}
);

users.hasOne(tools);
tools.belongsTo(users);

module.exports = tools;
