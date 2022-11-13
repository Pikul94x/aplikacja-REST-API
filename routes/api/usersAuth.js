const jwt = require("jsonwebtoken");
const { User } = require("../../models/schema");
const { SECRET_KEY } = process.env;

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

module.exports = { authorization };
