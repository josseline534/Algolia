"use strict";

const app = require("./app/app");
const DB = require("./config/database");
const algoliasearch = require("algoliasearch/lite");

/* import algoliasearch from "algoliasearch/lite"; */
// API keys below contain actual values tied to your Algolia account
const client = algoliasearch("F2YE0L1K11", "6c345fee5812d36380334478883ee8e4");
const index = client.initIndex("your_index_name");

app.set("port", process.env.PORT || 3000);
const port = app.get("port");

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
    DB.connect(async (error) => {
        if (error) throw err;
        const result = await DB.query(`SELECT * FROM apiprueba`);
        result.rows.forEach((item) => {
            // Make sure each object has an 'ObjectID' defined
            // We recommend keeping the 'ObjectID' analogous to your internal ID
            item.objectID = item.id;
            // Index the item with Algolia
            index.saveObject(item);
        });
    });
});
