require("dotenv").config();
const express = require("express");
const { doScraping } = require("./js/WebScraping");

//server
const port = process.env.PORT || 3000;
const app = express();

//server
app.get("/", function (req, res) {
  res.send(JSON.stringify({ Hola: "Mundo!" }));
});

app.listen(port, function () {
  console.log(`Escuchando en puerto ${port}`);
});

//todos los dias a las 12, comprueba si hay algo nuevo
setInterval(() => {
  let date = new Date();
  if (date.getUTCHours() - 3 === 12 && date.getUTCMinutes() === 00) {
    doScraping();
  }
}, 60000);
