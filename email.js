const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "mateusz.bizon@studenci.collegiumwitelona.pl",
		pass: "mat-biz@wp.pl",
	},
});

module.exports = transporter;
