const db = require("../firebase/config");

const getConvocatoriasGuardadas = async () => {
  let documentos = null;
  await db
    .collection("nros_convocatorias")
    .get()
    .then((snap) => {
      snap.forEach((a) => {
        documentos = a.data();
      });
    });
  return documentos;
};

const setConvocatoriasGuardadas = async (convocatorias) => {
  await db
    .collection("nros_convocatorias")
    .doc("JA9DDvvkPPAhWzLMiS4m")
    .update({ convocatorias });
};

module.exports = {
  getConvocatoriasGuardadas,
  setConvocatoriasGuardadas,
};
