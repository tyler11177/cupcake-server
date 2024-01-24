const { Pool } = require('pg');
const CONFIG = require('../config.json');
const pool = new Pool(CONFIG.databaseConnection);
try {
    pool.query('DROP TABLE IF EXISTS cupcakes;');
    pool.query(`CREATE TABLE cupcakes (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    description text,
    price numeric(10, 2) NOT NULL,
    ingredients text[] -- an array of strings
    );`);
    console.log("Sucessfully created tables");
}
catch (Error) {
    console.error(`Error creating table: ${Error}`);
}