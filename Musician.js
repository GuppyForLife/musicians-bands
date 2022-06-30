const {Sequelize, sequelize} = require('./db');

// TODO - define the Musician model

/* 

This will involve calling the sequelize.define() method, and passing in two arguments to the method - the first one is a string 'musician', the second is an object with two kep/values pairs.  They are pair1: name, with the value1: Sequelize.STRING, and key2: intrument and value2: Sequelize.STRING

*/
let Musician = sequelize.define('musician',
    {
        name: Sequelize.STRING,
        instrument: Sequelize.STRING
    }
);

module.exports = {
    Musician
};