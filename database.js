const config = require('./config.json');
const mongoose = require('mongoose');

function connect() {
    mongoose.connect(config.connectionString, {useNewUrlParser: true});
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        // we're connected!
    });
    return db;
}

module.exports = connect;
