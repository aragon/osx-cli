import { Command, Option } from 'commander';
import { newHandler } from './handlers/newHandler.js';

export const newPlugin = new Command('new');

newPlugin
  .description('start a new plugin project from a template')
  .addOption(
    new Option('-k, --kind <kind>', 'kind of plugin to create').choices([
      'basic',
      'governance',
    ]),
  )
  .addOption(
    new Option('-t, --type <type>', 'type of plugin to create').choices([
      'upgradable',
      'clones',
    ]),
  )
  .action(newHandler);
