const mongoose = require('mongoose');
//Configuring env variables
require('dotenv').config();
// Map global promise - get rid of warning
mongoose.Promise = global.Promise;
// Connect to db
const db = mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true
});

// Import model
const Customer = require('./models/customer');

//Import Chalk
const chalk = require('chalk');

// Add Customer
const addCustomer = (customer) => {
  Customer.create(customer).then(customer => {
    console.info(chalk.green.inverse('New Customer Added'));
    mongoose.disconnect();
  });
}

// Find Customer
const findCustomer = (name) => {
  // Make case insensitive
  const search = new RegExp(name, 'i');
  Customer.find({$or: [{firstname: search}, {lastname: search}]})
    .then(customer => {
      console.info(chalk.cyan(customer));
      console.info(chalk.cyan.inverse(`${customer.length} matches`));
      mongoose.disconnect();
    });
}

// Update Customer
const updateCustomer = (_id, customer) => {
  Customer.update({ _id }, customer)
    .then(customer => {
      console.info(chalk.yellow.inverse('Customer Updated'));
      mongoose.disconnect();
    });
}

// Remove Customer
const removeCustomer = (_id) => {
  Customer.remove({ _id })
    .then(customer => {
      console.info(chalk.red.inverse('Customer Removed'));
      mongoose.disconnect();
    });
}

// List Customers
const listCustomers = () => {
  Customer.find()
    .then(customers => {
      console.info(customers);
      console.info(chalk.cyan.inverse(`${customers.length} customers`));
      mongoose.disconnect();
    });
}

// Export All Methods
module.exports = {
  addCustomer,
  findCustomer,
  updateCustomer,
  removeCustomer,
  listCustomers
}
