const grades = require("../models/grades");
const notes = require("../models/notes");
const contests = require("../models/contests");

const home_get = (req, res) => {
	if (req.user.rola == "admin") {
		res.redirect("/homeAdmin");
	} else {
		res.render("home.ejs", { user: req.user.imie, surname: req.user.nazwisko });
	}
};

const oceny_get = (req, res) => {
	grades
		.sync()
		.then(result => {
			return grades.findAll({ where: { uzytkownicyId: req.user.id } });
		})
		.then(grade => {
			res.render("oceny.ejs", {
				title: "title",
				action: "add",
				sampleData: grade,
			});
		})
		.catch(err => {
			if (err) {
				throw err;
			}
		});
};

const uwagi_get = (req, res) => {
	notes
		.sync()
		.then(result => {
			return notes.findAll({ where: { uzytkownicyId: req.user.id } });
		})
		.then(note => {
			res.render("uwagi.ejs", {
				title: "title",
				action: "add",
				sampleData: note,
			});
		})
		.catch(err => {
			if (err) {
				throw err;
			}
		});
};

const konkursy_get = (req, res) => {
	contests
		.sync()
		.then(result => {
			return contests.findAll();
		})
		.then(contest => {
			res.render("konkursy.ejs", {
				title: "title",
				action: "add",
				sampleData: contest,
			});
		})
		.catch(err => {
			if (err) {
				throw err;
			}
		});
};

module.exports = {
	home_get,
	oceny_get,
	uwagi_get,
	konkursy_get,
};
