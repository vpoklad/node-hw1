const fs = require ('fs/promises');
const path = require('path');
const { v4: uuid } = require('uuid');


 const contactsPath = path.join(__dirname, 'db','contacts.JSON' );
 
 


const  listContacts = async()=> {
    const contacts = await fs.readFile(contactsPath, 'utf8')
    return JSON.parse(contacts)
}

const  getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.filter(item => item.id === contactId) 
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactToRemove = contacts.find(item => item.id === contactId)
  if (!contactToRemove) { return }
  const content = contacts.filter((item => item.id !== contactId));
  await fs.writeFile(contactsPath, JSON.stringify(content, null, 2))
  console.log("Contact deleted! ", contactToRemove )
}

const  addContact = async (name, email, phone)=> {
  const contacts = await listContacts();
  const newContact = { id: uuid(), name, email, phone, }
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  console.log("New Contact added!", newContact)
}




module.exports = {
    listContacts, getContactById, removeContact, addContact
}