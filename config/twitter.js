const Twitter = require("twitter");

const cliente = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token_key,
  access_token_secret: process.env.access_token_secret,
});

client.post("statuses/update", { status: "I am a tweet" }, function (
  error,
  tweet,
  response
) {
  if (!error) {
    console.log(tweet);
  }
});

module.exports = cliente;
