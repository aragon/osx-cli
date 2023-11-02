import { Command, Option } from 'commander';
import { deployHandler } from './deployHandler';
import { allowedNetworks } from 'src/types';

export const deploy = new Command('deploy');

deploy
  .description('deploy a setup contract')
  .argument('[contract]', 'Contract to deploy')
  .addOption(
    new Option('-b, --build [build]', 'full path to project build eg "/Users/main/plugin-repo/artifacts"'),
  )
  .addOption(new Option('-n, --network [network]', 'Network to deploy to').choices(allowedNetworks))
  .option('-s, --simulate', 'Simulate deployment')
  .action(deployHandler);
