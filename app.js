const fs = require('fs');

const _ = require('lodash');
const yargs = require('yargs');

const notas = require('./notas.js');

const opcionesDeTitulo = {
  describe: 'Título de la nota',
  demand: true,
  alias: 't'
}

const opcionesDeCuerpo = {
  describe: 'Cuerpo de la nota',
  demand: true,
  alias: 'c'
}

const argv = yargs
  .command('agregar', 'Agregar una nueva nota', {
    titulo: opcionesDeTitulo,
    cuerpo: opcionesDeCuerpo
  })
  .command('eliminar', 'Eliminar una nota', {
    titulo: opcionesDeTitulo,
  })
  .command('leer', 'Leer una nota', {
    titulo: opcionesDeTitulo,
  })
  .command('lista', 'Listar todas las notas', {
  })
  .help()
  .argv;
var comando = argv._[0];

var imprimirNotas = (nota) => {
  console.log('-------------');
  console.log(`Título: ${nota.titulo}`);
  console.log(`Cuerpo: ${nota.cuerpo}`);
};

switch (comando) {
  case 'agregar':
    var nota = notas.agregarNota(argv.titulo, argv.cuerpo);
    if (nota) {
      console.log('Nota agregada');
      imprimirNotas(nota);
    } else {
      console.log('Ya existe una nota con ese título');
    }    
    break;

  case 'eliminar':
    var notaEliminada = notas.eliminarNota(argv.titulo);
    var mensaje = notaEliminada ? `La nota: "${argv.titulo}" ha sido eliminada.` : 'Nota no encontrada';
    console.log(mensaje);
    break;

  case 'leer':
    var nota = notas.leerNota(argv.titulo);
    if (nota) {
      imprimirNotas(nota);
    } else {
      console.log('Nota no encontrada.');
    }   
    break;

  case 'lista':
    var lista = notas.listarNotas();
    lista.forEach(nota => imprimirNotas(nota));
    break;

  default:
    console.log('Comando no válido');
    break;
} 