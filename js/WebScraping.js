//require
const puppeteer = require("puppeteer");
const jsdom = require("jsdom");
const {
  getConvocatoriasGuardadas,
  setConvocatoriasGuardadas,
} = require("./ManejoDB");
const { notificarEnPrivado } = require("./BotControl");
const { arreglosIguales } = require("./Utilidades");
const { JSDOM } = jsdom;

const doScraping = async () => {
  // traigo desde firebase las convocatorias previas
  const { convocatorias: conv_guardadas } = await getConvocatoriasGuardadas();
  console.log("Convocatorias guardadas ", conv_guardadas);

  // web scraping
  try {
    //entramos a la pagina mediante puppeteer
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    const response = await page.goto(
      "http://fich.unl.edu.ar/pagina/convocatorias-rentadas/518/"
    );
    const body = await response.text();

    // 'parseamos' con JSDOM
    const { document } = new JSDOM(body).window;

    //compruebo si hay alguna nueva convocatoria
    const contenido = document.querySelector("#inner-content");
    let conv_nuevas = [];
    //armo un array con los nros de todas las convocatoria
    document.querySelectorAll("strong").forEach((element) => {
      // busco la frase Convocatoria....
      if (element.textContent.includes("Convocatoria ")) {
        // divido en un arr aux
        const conv_split = element.textContent.split(" ");
        // guardo el numero
        conv_nuevas.push(Number(conv_split[conv_split.length - 1]));
      }
    });

    console.log("convocatorias nuevas ", conv_nuevas);

    // si estan las mismas convocatorias que antes, no notifico, caso contrario, envio la data por telegram
    if (arreglosIguales(conv_guardadas, conv_nuevas)) {
      console.log("No hay nada nuevo para notificar");
      notificarEnPrivado(`No hay nada nuevo para notificar `);
    } else {
      console.log("Hay algo para notificar");
      conv_nuevas.forEach((d, idx) => {
        // busco cual de las conv_nuevas no estaba antes y la muestro
        if (!conv_guardadas.includes(d)) {
          console.log(d, idx + 1);
          notificarEnPrivado(
            "Convocatoria " +
              contenido.textContent.split("Convocatoria ")[idx + 1]
          );
        }
      });
    }

    // actualizo lo guardado en firebase con lo nuevo
    await setConvocatoriasGuardadas(conv_nuevas);

    await browser.close();
  } catch (error) {
    console.error("ERROR! ", error);
  }
};

module.exports = {
  doScraping,
};
