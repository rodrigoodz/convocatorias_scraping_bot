Web Scraping del sitio de convocatorias a pasantias de UNL-FICH. Para esto se usó [puppeteer](https://www.npmjs.com/package/puppeteer) como headless-browser y [jsdom](https://www.npmjs.com/package/jsdom) para realizar el scraping.<br>
Desplegado a Heroku, consultando todos los dias a las 12:00 ('levantando' el servidor 11:45hs mediante [cron-job.org](https://cron-job.org/en/))<br>
Para utilizarlo y recibir notificaciones en telegram, crear un archivo .env en el directorio root y agregar la variable ID_PRIV={id_propia_telegram}
