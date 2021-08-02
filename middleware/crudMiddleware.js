const User = require("../models/user");

async function crudMiddleware(req, res, next) {
  const { role: userRole } = await User.findOne({ _id: req.user.user_id });

  if (userRole !== "admin") {
    res.status(403).json({ message: "Forbidden" });
  } else {
    next();
  }
}

module.exports = crudMiddleware;
