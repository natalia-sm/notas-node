const fs = require('fs');

var leerNotasExistentes = () => {
  try {
    return JSON.parse(fs.readFileSync('notas.json'));
  } catch (error) {
    return [];
  }
};

var guardarNotas = (notas) => {
  fs.writeFileSync('notas.json', JSON.stringify(notas));
}

var agregarNota = (titulo, cuerpo) => {
  var notas = leerNotasExistentes();

  var nota = {
    titulo,
    cuerpo
  };

  var notasDuplicadas = notas.filter((nota) => titulo === nota.titulo);

  if (notasDuplicadas.length == 0){
    notas.push(nota);
    guardarNotas(notas);
    return nota;
  }  
}

var eliminarNota = (titulo) => {
  var notas = leerNotasExistentes();
  var notasFiltradas = notas.filter((nota) => titulo !== nota.titulo);
  guardarNotas(notasFiltradas);

  return notas.length != notasFiltradas.length;
}

var leerNota = (titulo) => {
  var notas = leerNotasExistentes();
  var notasFiltradas = notas.filter((nota => nota.titulo === titulo));
  return notasFiltradas[0];
}

var listarNotas = () => {
  return leerNotasExistentes();
}

module.exports = {
  agregarNota,
  eliminarNota,
  leerNota,
  listarNotas
}