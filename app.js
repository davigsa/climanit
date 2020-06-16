const axios = require("axios");
const moment = require("moment");
require("dotenv").config();

const Client = require("./config/twitter");
const conditionCode = require("./utils/conditionCode");
const posibleNames = require("./utils/posibleNames");
const hellGifs = require("./utils/hellGifs");
const winterIsGifs = require("./utils/winterIsGifs");

async function BotInit() {
  let weatherData = {};
  try {
    //requisita os dados da api de tempo
    await axios
      .get(
        `https://api.hgbrasil.com/weather?woeid=455891&key=${process.env.API_KEY}&locale=pt`
      )
      .then((res) => {
        return (weatherData = {
          temp: res.data.results.temp,
          currently: res.data.results.currently,
          condition_code: res.data.results.condition_code,
          forecast: res.data.results.forecast[0],
        });
      })
      .catch((err) => console.error(err));

    //get fucking hours
    const hours = moment().hours();
    const minutes = moment().minutes();
    const completeHours =
      minutes <= 9 ? `${hours}:0${minutes}` : `${hours}:${minutes}`;

    //logica da saudação
    const greetings =
      weatherData.currently === "dia" && hours >= 12
        ? "🌞 Boa tarde"
        : weatherData.currently === "dia"
        ? "🌞 Bom dia"
        : "🌝 Boa noite";

    //função para retornar itens aleatórios dentro de um array
    function returnArray(array) {
      return array[Math.floor(Math.random() * (array.length + 1))];
    }

    //logica para final da mensagem de acordo com o tempo
    const returnFinal = () => {
      let final = "Forte abraço!";
      if (weatherData.forecast.max >= 35) {
        return (final = `Simulação de inferno iniciada. 🥵 ${returnArray(
          hellGifs
        )}`);
      } else if (weatherData.forecast.max > 29) {
        return (final =
          "Prepare-se praquele calorzinho maneiro.. Hidrate-se. 💦");
      } else if (weatherData.forecast.max > 22) {
        return (final = "Só mais um dia normal, aproveite ~ou não~.");
      } else if (weatherData.forecast.max > 18) {
        return (final =
          "Niteroienses, uni-vos e tirai vossos casacos do guarda-roupa!");
      } else if (weatherData.forecast.max <= 18) {
        return (final = `Winter is comming 🐺 ${returnArray(winterIsGifs)}`);
      }
      return final;
    };

    //logica de construção do status
    const status =
      hours === 6
        ? `Bom dia, flor do dia 🌻. Hoje teremos máxima esperada de ${
            weatherData.forecast.max
          } e mínima de ${weatherData.forecast.min}. ${returnFinal()}`
        : `${greetings}, meus ${returnArray(
            posibleNames
          )} , são exatamente ${completeHours}. A temperatura nesse momento é de ${
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
// BotInit();
setInterval(() => BotInit(), 3600000);
///60000 3600000
