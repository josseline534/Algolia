"use strict";
const DB = require("../config/database");
const client = require("../config/algolia");

/* import algoliasearch from "algoliasearch/lite"; */
// API keys below contain actual values tied to your Algolia account
/* const client = algoliasearch("F2YE0L1K11", "6c345fee5812d36380334478883ee8e4"); */
const index = client.initIndex("poc_facturas");

let myQuery = `SELECT
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
            INNER JOIN products p ON d.productid = p.productid`;

const fillAlgoria = () => {
    DB.connect(async (error) => {
        if (error) throw err;
        const result = await DB.query(myQuery);
        result.rows.forEach((item, i) => {
            // Make sure each object has an 'ObjectID' defined
            // We recommend keeping the 'ObjectID' analogous to your internal ID
            item.objectID = i;
            // Index the item with Algolia
            index.saveObject(item);
            /* console.log("item: ", item); */
        });
    });
};

const controller = {
    getAlgolia: async (req, res) => {
        try {
            const response = await index.search("");
            console.log(response);
            res.status(200).json({
                code: 200,
                status: "SUCCESS",
                message: "OK",
                response: response,
            });
        } catch (error) {
            res.status(500).send("error");
            console.log(error);
        }
    },
    getAlgoliaId: async (req, res) => {
        try {
            const responseHit = [];
            //(hit) => hit.facturaid == req.params.id;
            const response = await index.search(req.params.id);

            for (const hit of response.hits) {
                if (hit.facturaid == req.params.id) {
                    responseHit.push(hit);
                }
            }
            res.status(200).json({
                code: 200,
                status: "SUCCESS",
                message: "OK",
                response: responseHit,
            });
        } catch (error) {
            res.status(500).send("error");
        }
    },
    getServer: async (req, res) => {
        try {
            const response = await DB.query(myQuery);
            res.status(200).json({
                code: 200,
                status: "SUCCESS",
                message: "OK",
                response: response.rows,
            });
        } catch (error) {
            res.status(500).send("error");
        }
    },
    getServerId: async (req, res) => {
        try {
            const response = await DB.query(
                myQuery + ` WHERE f.facturaid = ${req.params.id}`
            );
            res.status(200).json({
                code: 200,
                status: "SUCCESS",
                message: "OK",
                response: response.rows,
            });
        } catch (error) {
            res.status(500).send("error");
        }
    },
};

module.exports = controller;
