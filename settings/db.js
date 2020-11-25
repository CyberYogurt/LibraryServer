const pgp = require('pg-promise')();
const db = pgp('postgres://postgres:Danisimo17072002@localhost:5432/Biblioteka');

module.exports = db;