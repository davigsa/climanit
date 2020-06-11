const Twitter = require("twitter-lite");
require("dotenv").config();

const secret = require("./secrets");

const Client = new Twitter({
  subdomain: "api",
  version: "1.1",
  consumer_key: secret.consumer_key,
  consumer_secret: secret.consumer_secret,
  access_token_key: secret.access_token_key,
  access_token_secret: secret.access_token_secret,
});
module.exports = Client;
