#!/usr/bin/env node

import dotenv from 'dotenv';
import { Command } from 'commander';
import { settings } from './commands/settings/index.js';
import { deploy } from './commands/deploy/index.js';
import { publish } from './commands/publish/index.js';
import { info } from './commands/info/index.js';
import { Banner } from './lib/banner.js';
import { checkKeys } from './lib/keys.js';

dotenv.config();

const program = new Command();
program.description('Aragon OSx CLI');
program.version('0.0.0');
program.addCommand(settings);
program.addCommand(deploy);
program.addCommand(publish);
program.addCommand(info);

async function main(): Promise<void> {
  Banner();
  await checkKeys();
  await program.parseAsync();
}
console.log();
main();
