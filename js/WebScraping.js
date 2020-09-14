//require
const puppeteer = require("puppeteer");
const jsdom = require("jsdom");
const { getDB, setDB } = require("./ManejoDB");
const { notificarEnPrivado } = require("./BotControl");
const { JSDOM } = jsdom;

const doScraping = async () => {
  const { nro_ultima_convocatoria } = getDB();

  try {
    //entramos a la pagina mediante puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const response = await page.goto(
      "http://fich.unl.edu.ar/pagina/convocatorias-rentadas/518/"
    );
    const body = await response.text();

    // 'parseamos' con JSDOM
    const { document } = new JSDOM(body).window;

    //compruebo si hay alguna nueva convocatoria
    const contenido = document.querySelector("#inner-content");
    let nro_convocatorias = [];
    //armo un array con los nros de todas las convocatoria
    document.querySelectorAll("strong").forEach((element) => {
      nro_convocatorias.push(Number(element.textContent.split(" ")[2]));
    });
    //calculo el maximo (correspondiente a la ult. convocatoria)
    const nro_max = Math.max(...nro_convocatorias);
    //verifico si nro_max es mayor que el guardado en db, si lo es informo lo nuevo

    if (nro_max > nro_ultima_convocatoria) {
      console.log("Hay algo para notificar");
      notificarEnPrivado(contenido.textContent);
      setDB(nro_max);
    } else {
      console.log("No hay nada nuevo para notificar");
      // notificarEnPrivado(`No hay nada nuevo para notificar `);
    }

    await browser.close();
  } catch (error) {
    console.error("ERROR! ", error);
  }
};

module.exports = {
  doScraping,
};
