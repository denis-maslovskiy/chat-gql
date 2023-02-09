const Joi = require("joi");

const email = Joi.string().email().required().label("Email");
const username = Joi.string()
  .alphanum()
  .min(3)
  .max(30)
  .required()
  .label("Username");
const name = Joi.string().alphanum().max(254).required().label("Name");
const password = Joi.string().required().label("Password");

const signUp = Joi.object().keys({
  email,
  username,
  name,
  password,
});

const signIn = Joi.object().keys({
  email,
  password,
});

const updateUser = Joi.object().keys({
  userId: Joi.string().required().label("User ID"),
  chatsToCheck: Joi.array()
    .unique()
    .items(Joi.string())
    .label("Chats to check"),
});

module.exports = {
  signIn,
  signUp,
  updateUser,
};
