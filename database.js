var mongoose = require('mongoose');

function connect() {
    mongoose.connect('mongodb://localhost/dejavu', {useNewUrlParser: true});
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        // we're connected!
    });
    return db;
}

module.exports = connect;
