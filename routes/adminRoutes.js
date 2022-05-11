const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminControllers");

router.get("/homeAdmin", checkNotAuthenticated, adminController.home_get);

router.post("/homeAdmin", adminController.home_post);

router.get(
	"/deleteUser",
	checkNotAuthenticated,
	adminController.deleteUser_get
);

router.post("/deleteUser", adminController.deleteUser_post);

function checkNotAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}

module.exports = router;
