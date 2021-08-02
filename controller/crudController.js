const User = require("../models/user");

// show list of all users in DB
module.exports.LIST = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
};

// create new user to DB
module.exports.CREATE = async (req, res) => {
  const { username, password, role } = req.body;

  if (!(username && password)) {
    res.status(400).send("All input is required");
  }

  if (await User.findOne({ username })) {
    return res.status(400).send("User Already Exist.");
  }

  try {
    const user = await User.create({ username, password, role });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

// update a user to DB
module.exports.EDIT = async (req, res, next) => {
  try {
    User.findByIdAndUpdate({ _id: req.params.id }, req.body)
      .then(function () {
        User.findOne({ _id: req.params.id }).then(function (user) {
          res.send(user);
        });
      })
      .catch(next);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

module.exports.DELETE = async (req, res, next) => {
  try {
    User.findByIdAndRemove({ _id: req.params.id })
      .then(function (user) {
        res.send(user);
      })
      .catch(next);
  } catch (err) {
    console.log(err);
  }
};
