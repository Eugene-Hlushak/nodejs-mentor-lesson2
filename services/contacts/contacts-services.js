const Contact = require("../../db/models/contact-model");

const getContacts = async () => {
  const result = await Contact.find();
  return result;
};

const addContact = async (data) => {
  const result = await Contact.create(data);
  return result;
};

const removeContact = async (id) => {
  const result = await Contact.findByIdAndRemove(id);
  return result;
};

const editContact = async (id, data) => {
  const result = await Contact.findByIdAndUpdate(id, data,{new:true});
  return result;
};
module.exports = { getContacts, addContact, removeContact, editContact };
