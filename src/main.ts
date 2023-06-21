#!/usr/bin/env node

import { Command } from 'commander';
import { settings } from './commands/settings/index.js';

const program = new Command();
program.description('OSx DevKit');
program.version('0.0.0');
program.addCommand(settings);

async function main(): Promise<void> {
  await program.parseAsync();
}
console.log();
main();
