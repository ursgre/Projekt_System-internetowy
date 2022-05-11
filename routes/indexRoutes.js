const express = require("express");
const router = express.Router();
const users = require("../models/users");
const passport = require("passport");
const indexController = require("../controllers/indexControllers");
const init = require("../passportConfig");
init(passport);

router.use(passport.initialize());
router.use(passport.session());

router.get("/", (req, res) => {
	res.redirect("/login");
});

router.get("/api/:id", (req, res) => {
	const api = users.findAll({ where: { id: req.params.id } });
	if (!api) res.status(404).send("Użytkownik z podanym id nie istnieje");
	res.send(api);
});

router.get("/login", checkAuthenticated, indexController.login_get);

router.post("/login", indexController.login_post);

function checkAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return res.redirect("/home");
	}
	next();
}

module.exports = router;
