const TelegramBot = require("node-telegram-bot-api");
// node-telegram-bot-api
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token);

//bot_id
const bot_id = process.env.BOT_ID;

const notificarEnPrivado = async (contenido) => {
  let date = new Date();

  bot
    .sendMessage(
      process.env.ID_PRIV,
      `<b>${date.getDate()}/${date.getMonth()}/${date.getFullYear()}</b>`,
      {
        parse_mode: "HTML",
      }
    )
    .then(() => {
      bot.sendMessage(process.env.ID_PRIV, `<i>${contenido}</i>`, {
        parse_mode: "HTML",
      });
    });
  return;
};

module.exports = {
  notificarEnPrivado,
};
