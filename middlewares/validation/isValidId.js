const mongoose = require("mongoose");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!mongoose.isValidObjectId(contactId)) {
    return res.status(404).json({ message: "Not found" });
  }
  next();
};

module.exports = isValidId;
