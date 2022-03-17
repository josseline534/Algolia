"use strict";

const app = require("./app/app");
const DB = require("./config/database");
const client = require("./config/algolia");

// API keys below contain actual values tied to your Algolia account
/* const client = algoliasearch("F2YE0L1K11", "6c345fee5812d36380334478883ee8e4"); */
const index = client.initIndex("poc_facturas");

app.set("port", process.env.PORT || 3000);
const port = app.get("port");

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
    /* DB.connect(async (error) => {
        if (error) throw err;
        const result = await DB.query(`SELECT
            f.facturaid,
            f.datefactura as fechaVenta,
            f.subtotal,
            f.iva,
            f.total,
            u.firtname as nombreCliente,
            u.lastname as apellidoCLiente,
            s.sucursalname as nombreSucursal,
            p.productname as nombreProduct,
            precio,
            d.cantidad
            FROM
            factura f
            INNER JOIN users u ON f.clienteid = u.userid
            INNER JOIN sucursales s ON f.sucursalid = s.sucursalid
            INNER JOIN detallefactura d ON f.facturaid = d.facturaid
            INNER JOIN products p ON d.productid = p.productid`);
        result.rows.forEach((item, i) => {
            // Make sure each object has an 'ObjectID' defined
            // We recommend keeping the 'ObjectID' analogous to your internal ID
            console.log(i);
            item.objectID = i;
            // Index the item with Algolia
            index.saveObject(item);
            console.log("Se añadio correctamente");
        });
    }); */
});
