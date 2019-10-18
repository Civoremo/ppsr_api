const { jwt } = require("../../configMW/configMW.js");

module.exports = {
	protected,
};

function protected(req, res, next) {
	const token = req.headers.authorization;

	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
			if (err) {
				res.status(401).json({ message: "Invalid Token" });
			} else {
				req.decodedToken = decodedToken;
				next();
			}
		});
	} else {
		res.status(403).json({ message: "Not Authorized!" });
	}
}
