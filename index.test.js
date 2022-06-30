const {sequelize} = require('./db');
const {Band, Musician} = require('./index')

describe('Band and Musician Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })

    test('can create a Band', async () => {
        // TODO - test creating a band
        /**
         * Create a new instance of a band using the Band Model
         *  Check to see if the name passed into the object is in fact the correct on the new instance
         **/
        const band = await Band.create({ name: 'The Beatles', genre: 'Rock'})
        expect(band.name).toBe('The Beatles');
    })

    test('can create a Musician', async () => {
        // TODO - test creating a musician
        /**
         * Create a new instance of a musician using the Musician Model
         *  Check to see if the name or intrument passed into the object is infact the correct on the new instance
         **/
        const musician = await Musician.create({ name:'John Lennon', instrument:'Guitar'})
        expect(musician.instrument).toBe('Guitar');
    })

    /*
     * Optional test to show associations:
        - I've completed this test for you
        - I've left it here for you to see how to go about testing associations 
    */

    test('Band can have many Musicians', async () => {
        await sequelize.sync({ force: true }); // recreate db
        let BigBang = await Band.create({ name: 'BIGBANG', genre: 'KPOP' }); //create band
        let GD = await Musician.create({ name: 'G-Dragon', instrument: 'Voice' }); //create musician
        let Top = await Musician.create({ name: 'TOP', instrument: 'Voice' }); //create musician
    
        await BigBang.addMusician(GD); //add musician to band
        await BigBang.addMusician(Top); //add musician to band
    
        const musicians = await BigBang.getMusicians(); //get all musicians in band - returns an array
    
        expect(musicians.length).toBe(2); //we've added two musicians, so the length should be two
        expect(musicians[0] instanceof Musician).toBeTruthy; //checks that the value at index 0 of the list - a musician object, is in fact a musician object
      });
})