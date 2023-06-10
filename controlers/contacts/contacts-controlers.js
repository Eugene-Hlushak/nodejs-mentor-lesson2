const {
  getContacts,
  addContact,
  removeContact,
  editContact,
} = require("../../services/contacts/contacts-services");

const contactList = async (req, res) => {
  const list = await getContacts();

  res.json(list);
};

const newContact = async (req, res) => {
  const contact = await addContact(req.body);

  res.status(201).json(contact);
};

const deleteContact = async (req, res) => {
  const result = await removeContact(req.params.contactId);
  if (!result) {
    res.status(404).json({ message: "Not found" });
  }
  res.json({ message: "Contact successfully deleted" });
};

const putContact = async (req, res) => {
  const result = await editContact(req.params.contactId, req.body);
  res.status(200).json(result);
};

module.exports = { contactList, newContact, deleteContact, putContact };
