const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");

router.get("/home", checkNotAuthenticated, userController.home_get);

router.get("/oceny", checkNotAuthenticated, userController.oceny_get);

router.get("/uwagi", checkNotAuthenticated, userController.uwagi_get);

router.get("/konkursy", checkNotAuthenticated, userController.konkursy_get);

function checkNotAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}

module.exports = router;
