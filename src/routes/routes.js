"use strict";

const express = require("express");
const router = express.Router();
const p = require("../controllers/controllers");

router.get("/algolia", p.getAlgolia);
router.get("/algolia/:id", p.getAlgoliaId);
router.get("/server", p.getServer);
router.get("/server/:id", p.getServerId);

module.exports = router;
