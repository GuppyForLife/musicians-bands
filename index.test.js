const {sequelize} = require('./db');
const {Band, Musician} = require('./index');
const { Song } = require('./Song');

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
        expect(band.genre).toBe('Rock');
    })

    test('can create a Musician', async () => {
        // TODO - test creating a musician
        /**
         * Create a new instance of a musician using the Musician Model
         *  Check to see if the name or intrument passed into the object is infact the correct on the new instance
         **/
        const musician = await Musician.create({ name:'John Lennon', instrument:'Guitar'});
        expect(musician.instrument).toBe('Guitar');
        expect(musician.name).toBe('John Lennon');
    })
    
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
    })

    test('can create a Song', async () => {
        const song = await Song.create({title: 'Hey Jude', year: 1968});
        expect(song.title).toEqual('Hey Jude');
        expect(song.year).toEqual(1968);
    })

    test('Bands have many Songs and Songs have many Bands', async () => {
        await sequelize.sync({ force: true });
        const beatles = await Band.create({ name: 'The Beatles', genre: 'Rock' });
        const bigBang = await Band.create({ name: 'BIGBANG', genre: 'KPOP' });
        const heyJude = await Song.create({title: 'Hey Jude', year: 1968});
        const stillLife = await Song.create({title: 'Still Life', year: 2022});

        await bigBang.addSong(stillLife);
        await bigBang.addSong(heyJude);
        const bigBangsongs = await bigBang.getSongs();
        expect(bigBangsongs.length).toEqual(2);
        expect(bigBangsongs[1].title).toEqual('Still Life');
        expect(bigBangsongs[0].title).toEqual('Hey Jude');
        expect(bigBangsongs[1].year).toEqual(2022);
        expect(bigBangsongs[0].year).toEqual(1968);

        await beatles.addSong(stillLife);
        await beatles.addSong(heyJude);
        const beatlesSongs = await bigBang.getSongs();
        expect(beatlesSongs.length).toEqual(2);
        expect(beatlesSongs[1].title).toEqual('Still Life');
        expect(beatlesSongs[0].title).toEqual('Hey Jude');
        expect(beatlesSongs[1].year).toEqual(2022);
        expect(beatlesSongs[0].year).toEqual(1968);
    })

    test('Eager loading data', async () => {
        await sequelize.sync({ force: true });
        const beatles = await Band.create({ name: 'The Beatles', genre: 'Rock' });
        const heyJude = await Song.create({title: 'Hey Jude', year: 1968});
        const musician = await Musician.create({ name:'John Lennon', instrument:'Guitar'});
        await beatles.addMusician(musician);
        await beatles.addSong(heyJude);

        const bands = await Band.findAll({
            include :[
                { model: Musician, as: 'musicians'},
                { model: Song, as: 'songs'}
            ]
        });

        expect(bands[0].musicians[0].name).toBe('John Lennon');
        expect(bands[0].musicians[0].instrument).toBe('Guitar');
        expect(bands[0].songs[0].title).toBe('Hey Jude');
        expect(bands[0].songs[0].year).toBe(1968);
    })
});