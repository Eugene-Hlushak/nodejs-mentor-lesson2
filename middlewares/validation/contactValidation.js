const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().min(1).max(20).trim().required(),
  number: Joi.string().min(7).max(20).trim().required(),
});

const addContactValidation = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "Name and number cannot be empty",
    });
  }

  const fields = ["name", "number"];

  for (const field of fields) {
    if (req.body[field] === undefined) {
      return res.status(400).json({ message: `Field ${field} must be filled` });
    }
  }

  const { error } = addContactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

module.exports = { addContactValidation };
