const jwt = require("jsonwebtoken");
const { User } = require("../../models/schema");
const { SECRET_KEY } = process.env;
const { nanoid } = require("nanoid");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();


const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const authorization = async (req, res, next) => {
	const { authorization = "" } = req.headers;
	const [bearer, token] = authorization.split(" ");
	if (bearer !== "Bearer") {
		return res.status(401).json({ message: "Not authorized" });
	}
	try {
		const { id } = jwt.verify(token, SECRET_KEY);
		const user = await User.findById(id);
		if (!user || !user.token) {
			return res.status(401);
		}
		req.user = user;
		next();
	} catch (error) {
		return res.status(401).json({ message: "Not authorized" });
	}
};

const sendVerificationEmail = async (emailTo) => {
	const verificationToken = nanoid();
	const mail = {
		to: emailTo,
		from: 'jakub.pikul1994@gmail.com',
		subject: "Verification",
		html: `<a target="_blank" href="http://localhost:4000/api/users/verify/${verificationToken}">Click to verify</a>`,
	};
	await sgMail.send(mail);

	return verificationToken;

}

module.exports = { authorization, sendVerificationEmail };
