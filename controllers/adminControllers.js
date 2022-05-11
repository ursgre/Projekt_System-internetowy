const bcrypt = require("bcrypt");
const users = require("../models/users");
const { Op } = require("sequelize");
const transporter = require("../email");

const home_get = (req, res) => {
	res.render("register.ejs", { error: "" });
};

const home_post = async (req, res) => {
	let { name, surname, email, password, password2 } = req.body;
	if (!name || !surname || !email || !password || !password2) {
		{
			res.render("register.ejs", { error: "Proszę wypełnij wszystkie pola" });
		}
	} else if (password.length < 6) {
		res.render("register.ejs", {
			error: "Hasło musi mieć przynajmniej 6 znaków",
		});
	} else if (password !== password2) {
		res.render("register.ejs", { error: "Hasła nie pasują do siebie" });
	} else {
		try {
			const hashedPassword = await bcrypt.hash(req.body.password, 10);
			users.sync().then(result => {
				users.create({
					imie: name,
					nazwisko: surname,
					haslo: hashedPassword,
					email: email,
					rola: "student",
				});
				console.log(result);
			});
			let mailOptions = {
				from: "mateusz.bizon@studenci.collegiumwitelona.pl",
				to: email,
				subject: "Rejestracja ucznia w systemie",
				text: "Gratulacje! Zostałeś zarejestrowany w naszym systemie",
			};
			transporter.sendMail(mailOptions, (err, success) => {
				if (err) {
					console.log(err);
				} else {
					console.log("Email is sent");
				}
			});
			req.flash("success_msg", "Pomyślnie zarejetrowano ucznia");
			res.redirect("/homeAdmin");
		} catch {
			res.redirect("/homeAdmin");
		}
	}
};

const deleteUser_get = (req, res) => {
	res.render("deleteUser.ejs", { error: "" });
};

const deleteUser_post = (req, res) => {
	let email = req.body.email;

	if (!email) {
		{
			res.render("deleteUser.ejs", { error: "Prosze wypełnij pole email" });
		}
	} else {
		users
			.sync()
			.then(result => {
				return users.destroy({
					where: { [Op.and]: [{ email: email }, { rola: "student" }] },
				});
			})
			.then(user => {
				if (user) {
					res.render("deleteUser.ejs", { error: "Usunięto ucznia" });
				} else {
					res.render("deleteUser.ejs", {
						error:
							"Nie znaleziono ucznia z tym emailem lub email jest emailem admina",
					});
				}
			});
	}
};

module.exports = {
	home_get,
	home_post,
	deleteUser_get,
	deleteUser_post,
};
