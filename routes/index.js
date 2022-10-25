const express = require("express");
const { idText } = require("typescript");
const router = express.Router();

router.use("/graphql", require("./schema"));

module.exports = router;
