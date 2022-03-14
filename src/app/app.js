"use strict";
let express = require("express");
let bodyParser = require("body-parser");

const routes = require("../routes/routes");

let app = express();

//Middlewares procesa datos antes de cargar ruta
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Habilitar cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, DELETE"
    );
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

//prefijos o rutas
app.use("/api", routes);

module.exports = app;
