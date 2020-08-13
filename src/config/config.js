// ============
// PORT
// ============

process.env.PORT = process.env.PORT || 3000;

// ============
// ENVIOREMENT
// ============

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ============
// DATA BASE
// ============

let urlDB;

if (process.env.NODE_ENV === 'dev') {

    urlDB = 'mongodb://localhost/task';

} else {

    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;