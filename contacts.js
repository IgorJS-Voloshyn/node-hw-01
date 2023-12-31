const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const contact = contacts.find(item => item.id === contactId);
  return contact || null;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(item => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [contact] = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contact;
};

const addContact = async data => {
  const contacts = await listContacts();
  const newContact = { id: uuidv4(), ...data };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};