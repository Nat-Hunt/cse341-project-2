require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  authorizationHost: process.env.AUTH0_DOMAIN,
  redirectUri: process.env.AUTH0_REDIRECT_URI,
  searchUri: process.env.POST_LOGIN_URI,
};
