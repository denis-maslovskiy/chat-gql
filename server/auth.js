const { AuthenticationError } = require("apollo-server-express");
const jwt = require("jsonwebtoken");
const { User } = require("./models");
const { JWT_SECRET_KEY } = require("./config");

const attemptSignIn = async (email, password, req) => {
  const message = "Incorrect email or password. Please try again.";

  const user = await User.findOne({ email });

  if (!user) {
    throw new AuthenticationError(message);
  }

  if (!(await user.matchesPassword(password))) {
    throw new AuthenticationError(message);
  }

  const payload = { userId: user.id, email: user.email };
  const token = jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: "3h",
  });

  return { user, token };
};

module.exports = {
  attemptSignIn,
};
