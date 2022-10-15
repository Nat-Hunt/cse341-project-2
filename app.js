const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// const mongodb = require("./db/connect");

// database connection
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// For using GraphQL
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
  .use(
    "/graphql",
    graphqlHTTP({
      //directing express-graphql to use this schema to map out the graph
      schema,
      //directing express-graphql to use graphiql when goto '/graphql' address in the browser
      //which provides an interface to make GraphQl queries
      graphiql: true,
    })
  );

app.listen(port, () => {
  console.log("Listening on port 3000");
});

mongoose.connect(process.env.DB_URI);

mongoose.connection.on("open", (ref) => {
  console.log("connected to database");
});

// app
//   .use(cors())
//   .use(bodyParser.json())
//   .use((req, res, next) => {
//     res.setHeader("Access-control-Allow-Origin", "*");
//     next();
//   })
//   .use("/", require("./routes"));

// mongodb.initDb((err, mongodb) => {
//   if (err) {
//     console.log(err);
//   } else {
//     app.listen(port);
//     console.log(`Example app listening on port ${port}`);
//   }
// });
