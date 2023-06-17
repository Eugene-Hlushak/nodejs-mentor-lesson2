const User = require("../db/models/user-model");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const userRegister = async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      res.status(409).json({ message: "Email in use" });
      return;
    }
    const avatarURL = gravatar.url(email);

    const newUser = new User({
      name,
      email,
      password,
      avatarURL,
    });

    await newUser.setPassword(password);
    newUser.save();
    const payload = { id: newUser._id };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    res.status(201).json({ user: { name, email, avatarURL }, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "Email or password is wrong" });
      return;
    }
    const isMatch = user.comparePassword(password);
    if (!isMatch) {
      res.status(404).json({ message: "Email or password is wrong" });
      return;
    }
    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    const userToken = await User.findByIdAndUpdate(user._id, { token });
    console.log(userToken);
    res.json({
      user: { name: user.name, email: user.email, avatarURL: user.avatarURL },
      token,
    });
  } catch (error) {
    res.status(500).json({ mesage: "Server error" });
  }
};

const userLogout = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ mesage: "Server error" });
  }
};

const userRefresh = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  if (!user) {
    res.status(404).json({ mesage: "User not found" });
    return;
  }
  res.json({ name: user.name, email: user.email, avatarURL: user.avatarURL });
};

module.exports = { userRegister, userLogin, userLogout, userRefresh };
