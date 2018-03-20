#!/usr/bin/env node
const startServer = require('./server');

var argv = require('yargs')
  .usage('Usage: lotran  [options]')
  .alias('d', 'dir')
  .nargs('d', 1)
  .describe('d', 'Directory to search for translation files')
  .demandOption(['d'])
  .help('h')
  .alias('f', 'files')
  .nargs('f', 1)
  .describe('f', 'Pattern for translation file names')
  .default('f', '**/*.translations.json')
  .help('h')
  .alias('u', 'url')
  .nargs('u', 1)
  .describe('u', 'Remote url for translations (without language parameter!), i.e http://my-app.com/translations')
  .demandOption(['u'])
  .help('h')
  .alias('p', 'port')
  .nargs('p', 1)
  .describe('p', 'Port to serve translations on')
  .default('p', 4300)
  .help('h')
  .alias('h', 'help')
  .epilog('---')
  .argv;

if (argv.d && argv.f && argv.u && argv.p) {
  startServer(argv.d, argv.f, argv.u, argv.p);
}