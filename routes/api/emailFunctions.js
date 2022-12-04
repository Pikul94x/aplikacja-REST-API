const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const { User, userSchemas } = require("../../models/schema");
const { sendVerificationEmail } = require("./usersAuth");

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async data => {
	const email = { ...data, from: "jakub.pikul1994@gmail.com" };
	await sgMail.send(email);
	return true;
};

const verifyEmail = async (req, res) => {
	const { verificationToken } = req.params;
	const user = await User.findOne({ verificationToken });
	if (!user) {
		res.status(404).json({ message: "User not found" });
		return;
	}
	await User.findByIdAndUpdate(user._id, {
		verificationToken: null,
		verify: true,
	});
	res.json({
		message: "Verification successful",
	});
};

const resendVerifyEmail = async (req, res) => {
	const { email } = req.body;
	const { error } = userSchemas.email.validate({ email });

	if (error) {
		res.status(400).json({ message: "Missing required field email" });
		return;
	}
	const user = await User.findOne({ email });
	if (!user) {
		res.status(404).json({ message: "Not found" });
		return;
	}
	if (user.verify) {
		res.status(400).json({ message: "Verification has already been passed" });
		return;
	}
	const verificationToken = await sendVerificationEmail(email); 
	await User.findByIdAndUpdate(user._id, { verificationToken });

	res.json({
		message: "Verification email sent",
	});
};

module.exports = {
	sendEmail,
	verifyEmail,
	resendVerifyEmail,
};
