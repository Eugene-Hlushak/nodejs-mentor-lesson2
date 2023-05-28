const express = require("express");

const {
  contactList,
  newContact,
  deleteContact,
  patchContact,
} = require("../../controlers/contacts/contacts-controlers");
const {
  addContactValidation,
  editContactValidation,
} = require("../../middlewares/validation/contactValidation");
const isValidId = require("../../middlewares/validation/isValidId");

const router = express.Router();

router.get("/", contactList);

router.post("/", addContactValidation, newContact);

router.delete("/:contactId", isValidId, deleteContact);

router.patch("/:contactId", isValidId, editContactValidation, patchContact);

module.exports = router;
