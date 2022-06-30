const path = require('path');
const { Sequelize } = require('sequelize');

// TODO - create the new sequelize connection

/**
 * Create a variable named sequelize, and save to it the following:
 *  a new Sequelize Object
 *  Pass on object in as the argument with the following key/value pairs
 *      dialect: 'sqlite'
 *      storage: path.join(__dirname, 'db.sqlite')
 *      logging: false (this last key/value is optional, but is often used with sequelize and I wanted you to see it.)
 */
const sequelize = new Sequelize(
    {
        dialect: 'sqlite',
        storage: path.join(__dirname, 'db.sqlite'),
        logging: false
    }
);
module.exports = {
    sequelize,
    Sequelize
};