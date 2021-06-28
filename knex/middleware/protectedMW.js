/** @format */

const { jwt } = require("../../configMW/configMW.js");

module.exports = {
  protected,
  adminProtected,
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

function adminProtected(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Invalid Token" });
      } else {
        if (decodedToken.userRole === "admini") {
          // console.log(decodedToken.userRole);
          req.decodedToken = decodedToken;
          next();
        } else {
          res.status(403).json({ message: "Unauthorized permissions!" });
        }
      }
    });
  } else {
    res.status(403).json({ message: "Not Authorized!" });
  }
}
