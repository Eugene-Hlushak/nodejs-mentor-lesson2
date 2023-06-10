const express = require("express");

const {
  contactList,
  newContact,
  deleteContact,
  putContact,
} = require("../../controlers/contacts/contacts-controlers");
const {
  addContactValidation,
} = require("../../middlewares/validation/contactValidation");
const isValidId = require("../../middlewares/validation/isValidId");

const router = express.Router();

router.get("/", contactList);

router.post("/", addContactValidation, newContact);

router.delete("/:contactId", isValidId, deleteContact);

router.put("/:contactId", isValidId, addContactValidation, putContact);

module.exports = router;
