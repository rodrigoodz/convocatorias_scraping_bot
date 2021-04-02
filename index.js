require("dotenv").config();
const express = require("express");
const { doScraping } = require("./js/WebScraping");

//server
const port = process.env.PORT || 3000;
const app = express();

//server
app.get("/", function (req, res) {
  res.send(JSON.stringify({ Hola: "Mundo!" }));
  // doScraping();
});

app.listen(port, function () {
  console.log(`Escuchando en puerto ${port}`);
});

// todos los dias a las 12, comprueba si hay algo nuevo
setInterval(() => {
  let date = new Date();
  //hours-3 debido a que Heroku tiene hora utc
  if (date.getHours() - 3 === 12 && date.getMinutes() === 00) {
    doScraping();
  }
}, 60000);
