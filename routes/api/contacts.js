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
const authenticate = require("../../middlewares/authenticate");

const router = express.Router();

router.get("/", authenticate, contactList);

router.post("/", addContactValidation, authenticate, newContact);

router.delete("/:contactId", isValidId, deleteContact);

router.put("/:contactId", isValidId, addContactValidation, putContact);

module.exports = router;
