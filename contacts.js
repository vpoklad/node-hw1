const fs = require ('fs/promises');
const path = require('path');
const { v4: uuid } = require('uuid');
const colors = require('colors');


const contactsPath = path.join(__dirname, 'db','contacts.JSON' );
 
 


const  listContacts = async()=> {
  const contacts = await fs.readFile(contactsPath, 'utf8')
  return JSON.parse(contacts)
}

const  getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find(item => item.id === contactId);
  if (!contact) {
    console.log("Nothing founded".red)
    return
  }
  return contact
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactToRemove = contacts.find(item => item.id === contactId)
  if (!contactToRemove) {
    console.log("Invalid id!".red);
    return
  }
  const content = contacts.filter((item => item.id !== contactId));
  await fs.writeFile(contactsPath, JSON.stringify(content, null, 2))
  console.log("Contact deleted! " .red)
}

const addContact = async (name, email, phone) => {
  if (name === undefined || email === undefined || phone === undefined) {
    console.log("Invalid input!".red)
    return
  }
  const contacts = await listContacts();
  const newContact = { id: uuid(), name, email, phone, }
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  console.log("New Contact added!".green);
  console.log(newContact)

}




module.exports = {
    listContacts, getContactById, removeContact, addContact
}