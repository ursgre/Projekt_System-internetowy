const express = require("express");
const app = express();
require("dotenv").config();
const session = require("express-session");
const flash = require("express-flash");
const indexRoutes = require("./routes/indexRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.set("view-engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(flash());
app.use(
	session({
		// Klucz, który chcemy zachować w tajemnicy, który zaszyfruje wszystkie nasze informacje
		secret: process.env.SESSION_SECRET,
		// zapisz nasze zmienne sesji, jeśli nic się nie zmieniło
		resave: false,
		// Zapisz pustą wartość, jeśli nie ma wartości
		saveUninitialized: false,
	})
);

app.listen(3000, () => {
	console.log("Listening...");
});

app.use(indexRoutes);
app.use(userRoutes);
app.use(adminRoutes);

app.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/login");
});

app.use((req, res) => {
	res.status(404).send("Not found");
});
