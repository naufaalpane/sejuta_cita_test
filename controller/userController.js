const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// log in a user from DB
module.exports.USER_LOGIN = async (req, res) => {
  try {
    let { username, password } = req.body;

    if (!(username && password)) {
      res.status(400).send("All input is required");
    }

    let user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken({ user_id: user._id });
      user.token = token;

      const refreshToken = jwt.sign(
        { user_id: user._id },
        process.env.JWT_REFRESH_TOKEN
      );
      user.refreshTokens = refreshToken;

      res.status(200).json(user);
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.USER_REFRESH = async (req, res) => {
  try {
    let { refreshTokens } = req.body;
    
    if (refreshTokens === null || refreshTokens === "") return res.sendStatus(401);

    jwt.verify(refreshTokens, process.env.JWT_REFRESH_TOKEN, (err, user) => {
      if (err) return res.sendStatus(403);
      const token = generateToken({ username: user.username });
      res.json({ token: token });
    });
  } catch (err) {
    console.log(err);
  }
};

function generateToken(user) {
  return jwt.sign(user, process.env.JWT_TOKEN, { expiresIn: "10s" });
}
