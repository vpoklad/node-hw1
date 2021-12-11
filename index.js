
const { Command } = require('commander')
const colors = require('colors');

const {listContacts, getContactById, removeContact, addContact} = require('./contacts.js')

const program = new Command()
program
  .requiredOption('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone')

program.parse(process.argv)

const argv = program.opts()

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
      case 'list':
          const contacts = await listContacts()
          console.table(contacts);
      
      break;

    case 'get':
          const contact = await getContactById(id);
          console.log(contact)
      break;

    case 'add':
    addContact(name, email, phone)
      break;

    case 'remove':
          removeContact(id);
      break;

    default:
      console.warn('Unknown action type!'.red);
  }
}

invokeAction(argv);