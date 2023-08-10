import { Command, Option } from 'commander';
import { infoHandler } from './infoHandler';

export const info = new Command('info');

info
  .description(`information about a Plugin's PluginRepo instance`)
  .argument('[repoName]', 'Plugin Repo Name')
  .addOption(
    new Option('-n, --network [network]', 'Network where the Plugin is published in').choices([
      'mainnet',
      'polygon',
      'goerli',
      'mumbai',
    ]),
  )
  .action(infoHandler);
