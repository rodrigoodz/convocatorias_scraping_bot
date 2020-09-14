const fs = require("fs");

let db = {};

const saveDB = () => {
  let data = JSON.stringify(db);

  fs.writeFile("db/db.json", data, (err) => {
    if (err) throw err;
    console.log("El archivo ha sido guardado con exito!");
  });
};

const loadDB = () => {
  try {
    db = require("../db/db.json");
  } catch (error) {
    db = {};
  }
};

const getDB = () => {
  loadDB();
  return db;
};

const setDB = (nro) => {
  db = {
    nro_ultima_convocatoria: nro,
  };
  saveDB();
  return;
};

module.exports = {
  getDB,
  setDB,
};
