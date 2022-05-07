const express = require("express");
const app = express();
require("dotenv").config();
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const users = require("./models/users");
const tools = require("./models/tools");

app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(flash());

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);

const init = require("./passportConfig");
init(passport);

app.use(passport.initialize());
app.use(passport.session());

app.listen(2000, () => {
	console.log("Listening..");
});

app.get("/", (req, res) => {
	res.redirect("/login");
});

app.get("/test", (req, res) => {
	res.render("test.ejs", { user: "Mateusz" });
});

app.get("/login", checkAuthenticated, (req, res) => {
	res.render("login.ejs", { message: "" });
});

app.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/dashboard",
		failureRedirect: "/login",
		failureFlash: true,
	})
);

app.get("/register", checkAuthenticated, (req, res) => {
	res.render("register.ejs", { message: "" });
});

app.post("/register", async (req, res) => {
	let { name, email, password, password2 } = req.body;
	if (!name || !email || !password || !password2) {
		{
			res.render("register.ejs", { message: "Please fill all fields" });
		}
	} else if (password.length < 6) {
		res.render("register.ejs", {
			message: "Password must be atleast 6 character long ",
		});
	} else if (password !== password2) {
		res.render("register.ejs", { message: "Passwords do not match" });
	} else {
		try {
			const hashedPassword = await bcrypt.hash(req.body.password, 10);
			users.sync().then(result => {
				users.create({
					username: name,
					password: hashedPassword,
					email: email,
				});
				console.log(result);
			});
			//req.flash("success_msg", "You are now registered. Please log in");
			res.redirect("/login");
		} catch {
			res.redirect("/register");
		}
	}
});

app.get("/dashboard", checkNotAuthenticated, (req, res) => {
	res.render("dashboard.ejs", { user: req.user.username });
	console.log(req.user.id);
});

app.get("/dashboard/about", checkNotAuthenticated, (req, res) => {
	tools
		.sync()
		.then(result => {
			return tools.findAll({ where: { userId: req.user.id } });
		})
		.then(tool => {
			res.render("about.ejs", {
				title: "title",
				action: "list",
				sampleData: tool,
			});
		})
		.catch(err => {
			if (err) {
				throw err;
			}
		});
});

app.use((req, res) => {
	res.status(404).send("Not found");
});

function checkNotAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect("/login");
}

function checkAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return res.redirect("/dashboard");
	}
	next();
}
