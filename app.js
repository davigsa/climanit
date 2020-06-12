const axios = require("axios");
const moment = require("moment");
require("dotenv").config();

const secret = require("./config/secrets");
const Client = require("./config/twitter");
const conditionCode = require("./utils/conditionCode");

async function BotInit() {
  let weatherData = {};
  try {
    await axios
      .get(
        `https://api.hgbrasil.com/weather?woeid=455891&key=${
          secret.api_key || process.env.API_KEY
        }&locale=pt`
      )
      .then((res) => {
        return (weatherData = {
          temp: res.data.results.temp,
          currently: res.data.results.currently,
          condition_code: res.data.results.condition_code,
          forecast: res.data.results.forecast,
        });
      })
      .catch((err) => console.error(err));
    //get fucking hours
    const hours = moment().hours();
    const minutes = moment().minutes();
    const completeHours =
      minutes <= 9 ? `${hours}:0${minutes}` : `${hours}:${minutes}`;
    //greetings logical
    const greetings =
      (weatherData.currently === "dia" && hours >= 12
        ? "🌞 Boa tarde"
        : "🌞 Bom dia") || "🌝 Boa noite";
    const status = `${greetings} , são exatamente ${completeHours}. A temperatura nesse momento é de ${
      weatherData.temp
    }°C ${conditionCode[weatherData.condition_code]}.`;
    console.log(status);
    async function tweetAboutWeather() {
      await Client.post("statuses/update", {
        status: status,
      });
    }

    tweetAboutWeather().catch(console.error);
    console.log(`Tweet enviado as ${completeHours}`);
  } catch (err) {
    console.log(err);
  }
}
console.log("Bot no ar");
// setInterval(() => BotInit(), 60000);
BotInit();
///60000 3600000
