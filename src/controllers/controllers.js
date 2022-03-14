"use strict";
const DB = require("../config/database");
//Models

const controller = {
    getPrueba: async (req, res) => {
        try {
            const response = await DB.query(`SELECT * FROM apiprueba`);
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
    getPruebaId: async (req, res) => {
        try {
            const response = await DB.query(
                `SELECT * FROM apiprueba WHERE id = ${req.params.id}`
            );
            res.status(200).json({
                code: 200,
                status: "SUCCESS",
                message: "OK",
                response: response.rows[0],
            });
        } catch (error) {
            res.status(500).send("error");
        }
    },
};

module.exports = controller;
