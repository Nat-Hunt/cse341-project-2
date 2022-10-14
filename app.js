const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// const mongodb = require("./db/connect");

// For using GraphQL
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");

const port = process.env.PORT || 3000;
const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log("Listening on port 3000");
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
