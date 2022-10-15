const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongodb = require("./db/connect");

const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");

const port = process.env.PORT || 3000;
const app = express();

app
  .use(cors())
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-control-Allow-Origin", "*");
    next();
  })
  // .use("/", require("./routes"))
  .use("/graphql", graphqlHTTP({ schema, graphiql: true }));

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`5e custom item API listening on ${port}`);
  }
});
