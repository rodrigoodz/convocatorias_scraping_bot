const TelegramBot = require("node-telegram-bot-api");
// node-telegram-bot-api
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token);

//bot_id
const bot_id = process.env.BOT_ID;

const notificarEnPrivado = async (contenido) => {
  //si el mensaje sobrepasa los 4096 caracteres, divido en dos mensajes (sino la api de telegram da problemas)
  if (contenido.length > 4096) {
    const Mensaje1 = contenido.slice(0, contenido.length / 2);
    const Mensaje2 = contenido.slice(contenido.length / 2, -1);
    enviarMensaje(bot, process.env.ID_PRIV, Mensaje1);
    enviarMensaje(bot, process.env.ID_PRIV, Mensaje2);
  } else {
    enviarMensaje(bot, process.env.ID_PRIV, contenido);
  }

  return;
};

const enviarMensaje = (bot, chat_id, mensaje) => {
  let date = new Date();

  bot
    .sendMessage(
      chat_id,
      `<b>${date.getDate()}/${date.getMonth()}/${date.getFullYear()}</b>`,
      {
        parse_mode: "HTML",
      }
    )
    .then(() => {
      bot.sendMessage(chat_id, `<i>${mensaje}</i>`, {
        parse_mode: "HTML",
      });
    });
};

module.exports = {
  notificarEnPrivado,
};
