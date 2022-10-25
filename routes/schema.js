const express = require("express");
const router = express.Router();
const { graphqlHTTP } = require("express-graphql");
const schema = require("../controllers/schema");

router.use("/", graphqlHTTP({ schema, graphiql: true }));

module.exports = router;
