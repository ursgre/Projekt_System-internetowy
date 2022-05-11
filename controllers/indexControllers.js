const passport = require("passport");

const login_get = (req, res) => {
	res.render("login.ejs");
};

const login_post = passport.authenticate("local", {
	successRedirect: "/home",
	failureRedirect: "/login",
	failureFlash: true,
});

module.exports = {
	login_get,
	login_post,
};
