#!/usr/bin/env node

import { Command } from 'commander';
import { newPlugin } from './commands/new/index.js';
import { repo } from './commands/repo/index.js';
import { settings } from './commands/settings/index.js';

const program = new Command();
program.description('Aragon Manager');
program.version('0.0.1');
program.addCommand(settings);
program.addCommand(repo);
program.addCommand(newPlugin);

async function main(): Promise<void> {
  await program.parseAsync();
}
console.log();
main();
