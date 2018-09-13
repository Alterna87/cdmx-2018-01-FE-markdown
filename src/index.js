#!/usr/bin/env node
const { mdLink, validateRoute } = require('./js/md-links');
const yargs = require('yargs');
let commands = yargs
  .command({
    command: '<path>',
    strict: 'true'
  })
  .demandCommand(1, 1, 'ERROR: Ingresa el comando mdLinks', 'ERROR: Write the path without spaces')
  .options({
    '_': {
      type: 'string',
      description: 'Path to search markdown in',
      demandOption: 'true',
    },
    'validate': {
      type: 'boolean',
      default: 'false',
      description: 'Valida los links de un archivo markdown'
    },
    'stats': {
      type: 'boolean',
      default: 'false',
      description: 'Muestra estadisticas básicas sobre los links encotrados en el archivo markdown'
    }
  })
  .help()
  .check((argv)=>{
    if (Object.keys(argv).length <= 4) {
      return true;
    } else {
      throw (new Error(' Opcion invalida'));
    }
  })
  .argv;

// console.log(commands.validate);
let path = commands._[0];
validateRoute(path);
//'./textprob.md';

if (commands.validate) {
  mdLink(path, commands)
  .then(archivo =>  console.log(archivo))
  .catch(console.error());

} else if (commands.stats) {
  console.log('argv: stats');
}

else {
  mdLink(path, commands)
  .then(archivo =>  console.log(archivo))
  .catch(console.error());
}
