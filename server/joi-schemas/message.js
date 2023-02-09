const Joi = require("joi");

const postMessage = Joi.object().keys({
  body: Joi.string().max(300).required().label("Body"),
  sender: Joi.string().required().label("Sender"),
  chatId: Joi.string().required().label("Chat ID"),
  file: Joi.object().label("File"),
});

module.exports = {
  postMessage,
};
