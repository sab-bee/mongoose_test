const jwt = require("jsonwebtoken");

function verifyUser(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).send({ message: "unauthorized access" });
  const token = auth.split(" ")[1];
  jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(403).send({ message: "forbidden access" });
    }
    req.decoded = decoded;
    next();
  });
}

module.exports = verifyUser;
