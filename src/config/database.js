"use strict";
const { Pool } = require("pg");

const db = new Pool({
    host: "147.182.201.5",
    user: "root",
    password: "123456",
    database: "prueba",
    port: "5434",
});

module.exports = db;
