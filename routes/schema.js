const express = require("express");
const router = express.Router();
const { graphqlHTTP } = require("express-graphql");
const schema = require("../controllers/schema");
const AuthorizationController = require("../controllers/authorizationController");

const loadUser = require("../middleware/loadUser");

router.use([loadUser]);
// console.log(req.user);
router.use(
  "/",
  graphqlHTTP(async (req) => ({
    schema,
    graphiql: true,
    context: () => context(req),
  }))
);

module.exports = router;
