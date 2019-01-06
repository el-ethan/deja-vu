const config = require('./config.json');
const mongoose = require('mongoose');

function connect() {
    mongoose.connect(config.connectionString, {useNewUrlParser: true});
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        //
    });
    return db;
}

module.exports = connect;
