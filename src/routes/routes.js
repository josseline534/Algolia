"use strict";

const express = require("express");
const router = express.Router();
const p = require("../controllers/controllers");

router.get("/prueba", p.getPrueba);
router.get("/prueba/:id", p.getPruebaId);

module.exports = router;
