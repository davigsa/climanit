const CronJob = require("cron").CronJob;
const axios = require("axios");

const app = require("./config/server.js");
const cliente = require("./config/twitter.js");

const server_port = process.env.PORT || 3000;
const server_host = process.env.HOST || "0.0.0.0";

async function getWeather(location, key) {
  await axios
    .get(`https://api.hgbrasil.com/weather?woeid=${location}&key=${key}`)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.error(err);
    });
}

//ebcc3b4c

console.log(getWeather(455891));
app.listen(server_port, server_host, function () {
  console.log("Aplicação online.");
});
