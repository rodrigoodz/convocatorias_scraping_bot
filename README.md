Web Scraping del sitio de convocatorias a pasantias de UNL-FICH. Para esto se usó [puppeteer](https://www.npmjs.com/package/puppeteer) como headless-browser y [jsdom](https://www.npmjs.com/package/jsdom) para realizar el scraping.<br>
Desplegado a Heroku, consultando todos los dias a las 12:00 ('levantando' el servidor 11:45hs mediante [cron-job.org](https://cron-job.org/en/))<br>
Para utilizarlo y recibir notificaciones en telegram, crear un archivo .env en el directorio root y agregar las variables

NTBA_FIX_319=1<br>
BOT_TOKEN={token_de_tu_bot}<br>
ID_PRIV={tu_id_de_telegram}<br>
API_KEY={configuracion_firebase}<br>
AUTH_DOMAIN={configuracion_firebase}<br>
PROJECT_ID={configuracion_firebase}<br>
STORAGE_BUCKET={configuracion_firebase}<br>
MESSAGING_SENDER_ID={configuracion_firebase}<br>
APP_ID={configuracion_firebase}<br>

<img src="./imagenes/screenshot01.jpg" width="300" height="600">
