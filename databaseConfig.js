const Sequelize = require("sequelize");

const sequelize = new Sequelize("baza", "root", "", {
	dialect: "mysql",
	host: "localhost",
});

sequelize
	.authenticate()
	.then(() => {
		console.log("mysql connected");
	})
	.catch(err => {
		if (err) {
			throw err;
		}
	});

module.exports = sequelize;
