const express = require("express");
const router = express.Router();
const { graphqlHTTP } = require("express-graphql");
const schema = require("../schema/schema");

const defaultQuery = `
  {
    allGear
      {
        id,
        name
      }
  }
`;

router.use("/graphql", graphqlHTTP({ schema, graphiql: { defaultQuery } }));

module.exports = router;
