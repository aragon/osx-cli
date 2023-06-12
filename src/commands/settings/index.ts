import { Command } from 'commander';
import { newHandler } from './handlers/newHandler.js';
import { viewHandler } from './handlers/viewHandler.js';

export const settings = new Command('settings');

settings.description('manage user settings');

settings
  .command('new')
  .description('store a new private key')
  .argument('[private-key]', 'Private key for signing transactions')
  .argument('[tenderly-key]', 'Tenderly API key for simulating transactions')
  .action(newHandler);

settings
  .command('view')
  .description('view public key and other settings')
  .action(viewHandler);
