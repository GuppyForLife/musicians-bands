const {Sequelize, sequelize} = require('./db');

// TODO - define the Band model

/* 

This will involve calling the sequelize.define() method, and passing in two arguments to the method - the first one is a string 'band', the second is an object with two kep/values pairs.  They are pair1: name, with the value1: Sequelize.STRING, and key2: genre and value2: Sequelize.STRING

*/
let Band = sequelize.define('band',
    {
        name: Sequelize.STRING,
        genre: Sequelize.STRING
    }
);

module.exports = {
    Band
};