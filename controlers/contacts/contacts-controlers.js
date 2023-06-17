const {
  getContacts,
  addContact,
  removeContact,
  editContact,
} = require("../../services/contacts/contacts-services");

const contactList = async (req, res) => {
  const { _id: owner } = req.user;
  const list = await getContacts(owner);

  res.json(list);
};

const newContact = async (req, res) => {
  // console.dir(req.user);
  const { _id: owner } = req.user;
  const contact = await addContact({...req.body, owner});

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
