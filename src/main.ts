#!/usr/bin/env node

import { Command } from 'commander';
import { settings } from './commands/settings/index.js';
import { deploy } from './commands/deploy/index.js';

const program = new Command();
program.description('Aragon OSx CLI');
program.version('0.0.0');
program.addCommand(settings);
program.addCommand(deploy);

async function main(): Promise<void> {
  await program.parseAsync();
}
console.log();
main();
