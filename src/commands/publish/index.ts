import { Command, Option } from 'commander';
import { publishHandler } from './publishHandler';
import { allowedNetworks } from 'src/types';

export const publish = new Command('publish');

publish
  .description('publish a Plugin to a PluginRepo')
  .argument('[contract]', 'Plugin Setup contract address')
  .addOption(new Option('-b, --build-metadata [build]', 'Path to the build metadata file'))
  .addOption(new Option('-r, --release-metadata [release]', 'Path to the release metadata file'))
  .addOption(new Option('-m, --maintainer [maintainer]', 'Address of the maintainer'))
  .addOption(new Option('-n, --network [network]', 'Network to deploy to').choices(allowedNetworks))
  .option('-s, --simulate', 'Simulate deployment')
  .action(publishHandler);
