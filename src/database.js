const mongoose = require('mongoose');

const URI = 'mongodb://localhost/task';

mongoose.connect(URI, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true })
    .then(db => console.log('----->Database is connected<-----'))
    .catch(err => console.error(err));


module.exports = mongoose;