#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();

program
  .description('Compare two configuration files and shows a difference')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2, format = program.opts().format) => {
    genDiff(filepath1, filepath2, format.format);
  });

program.parse(process.argv);
