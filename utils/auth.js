require("dotenv").config();
const jwt = require("jsonwebtoken");
module.exports = {
	isAuthenticated: (req, res, next) => {
		const authToken = req.headers.authorization;
		let token;

		if (authToken) {
			token = authToken.split(" ")[1];
		}

		if (!token) {
			return res.status(401).json({
				error: "You are not authorized",
			});
		}

		const decoded = verifyToken(token);

		if (Object.keys(decoded).length === 0) {
			return res.status(401).json({
				message: "Unauthorized",
			});
		}
		req.userInfo = decoded;
		next();
	},

	generateToken: (user, token_type) => {
		let token;

		if (token_type === "access") {
			token = jwt.sign(
				{ phone: user.phone, id: user.id },
				process.env.ACCESS_TOKEN,
				{
					expiresIn: "3600m",
				}
			);
		} else {
			token = jwt.sign({ phone: user.phone }, process.env.REFRESH_TOKEN);
		}
		return token;
	},
};

const verifyToken = (token) => {
	let decoded = {};
	jwt.verify(token, process.env.ACCESS_TOKEN, (err, paramdecoded) => {
		if (err) {
			return;
		}
		decoded = paramdecoded;
	});
	return decoded;
};
