import { Command, Option } from 'commander';
import { deployHandler } from './deployHandler';

export const deploy = new Command('deploy');

deploy
  .description('deploy a setup contract')
  .argument('[contract]', 'Contract to deploy')
  .addOption(new Option('-t, --type [type]', 'Project type').choices(['hardhat', 'foundry']))
  .addOption(
    new Option('-n, --network [network]', 'Network to deploy to').choices([
      'mainnet',
      'polygon',
      'goerli',
      'mumbai',
    ]),
  )
  .option('-s, --simulate', 'Simulate deployment')
  .action(deployHandler);
