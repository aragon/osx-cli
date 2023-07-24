import { Command, Option } from 'commander';
import { infoHandler } from './infoHandler';

export const info = new Command('info');

info
  .description('information about a Plugin Repo')
  .argument('[RepoName]', 'Plugin Repo Name')
  .addOption(
    new Option('-n, --network [network]', 'Network repo is deployed on').choices([
      'mainnet',
      'polygon',
      'goerli',
      'mumbai',
    ]),
  )
  .action(infoHandler);
