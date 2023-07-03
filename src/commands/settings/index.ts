import { Command } from 'commander';
import { privateKeyHandler } from './handlers/privateKeyHandler.js';
import { viewHandler } from './handlers/viewHandler.js';
import { tenderlyKeyHandler } from './handlers/tenderlyKeyHandler.js';

export const settings = new Command('settings');

settings.description('manage user settings');

settings
  .command('set-pk')
  .description('store a new private key')
  .argument('[private-key]', 'Private key for signing transactions')
  .action(privateKeyHandler);

settings
  .command('set-tenderly')
  .description('store a new tenderly configuration')
  .action(tenderlyKeyHandler);

settings
  .command('view')
  .description('view public key and other settings')
  .action(viewHandler);
