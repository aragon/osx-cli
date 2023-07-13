import { Command, Option } from 'commander';
import { publishHandler } from './publishHandler';

export const publish = new Command('publish');

publish
  .description('publish a Plugin to a PluginRepo')
  .argument('[contract]', 'Plugin Setup contract address')
  .addOption(new Option('-b, --build-metadata [build]', 'Path to the build metadata file'))
  .addOption(new Option('-r, --release-metadata [release]', 'Path to the release metadata file'))
  .addOption(new Option('-m, --maintainer [maintainer]', 'address of the maintainer'))
  .addOption(
    new Option('-n, --network [network]', 'Network to deploy to').choices([
      'mainnet',
      'polygon',
      'goerli',
      'mumbai',
    ]),
  )
  .option('-s, --simulate', 'Simulate deployment')
  .action(publishHandler);
