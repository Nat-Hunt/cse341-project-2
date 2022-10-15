const express = require("express");
const router = express.Router();

router.use("/graphql", require("./schema"));

module.exports = router;
