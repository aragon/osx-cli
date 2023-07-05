import chalk from 'chalk';
import { Network } from 'src/types';

export const warning = (message: string): string => chalk.yellow(message);
export const error = (message: string): string => chalk.red(message);
export const success = (message: string): string =>
  chalk.greenBright.bold(message);
export const exitWithMessage = (message: string): void => {
  console.log(error(message));
  process.exit(0);
};

export const logs = {
  ABORTED: error('Aborted.'),
  OVERRIDE_PK: warning(
    'Seems like you already have a private key stored. Are you sure you want to override it with a new one?',
  ),
  OVERRIDE_TENDERLY: warning(
    'Seems like you already have a Tenderly key stored. Are you sure you want to override it with a new one?',
  ),
  TENDERLY_NOT_FOUND: error(
    'No Tenderly key found. You can use the "new" command to store a Tenderly key.',
  ),
  PRIVATE_KEY_NOT_FOUND: error(
    'No private key found. Please use the "new" command to store a private key.',
  ),
  FAILED_TO_RETRIEVE_KEYS: error('Failed to retrieve keys:'),
  ENABLED: chalk.green('enabled'),
  DEPLOYMENT_FAILED: error('Contract deployment failed'),
  CONTRACT_BUILD_NOT_FOUND: (contract: string) =>
    error(`${contract}.sol build not found, did you compile?`),
  NOT_NETWORK: (network: string | undefined) =>
    error(`Network ${network} not found`),
  DEPLOYED: (contract: string, address: string | undefined, network: string) =>
    `\n\n🎉 ${chalk.greenBright.bold(
      contract,
    )}.sol: deployed to ${address} on ${chalk.green.bold(network)}`,
  EXPLORER: (explorer: string, txHash: string | undefined) =>
    success(`🔗 ${explorer}/tx/${txHash}`),
};

export const prompts = {
  PRIVATE_KEY: success('Please enter a private key:'),
  TENDERLY_KEY: success('Please enter a Tenderly key:'),
  TENDERLY_USERNAME: success('Please enter your Tenderly username:'),
  TENDERLY_PROJECT: success('Please enter your Tenderly project name:'),
  NETWORK_SELECTION: success('Please select a network:'),
  SETUP_NAME: success('Please enter the name of the Setup Contract:'),
  SIMULATE_DEPLOYMENT: warning('Do you want to simulate the deployment?'),
  BUILD_FOLDER: success(
    `Build Folder not detected. \nPlease enter the name of the build folder:`,
  ),
};

export const networks: Array<Network> = [
  {
    name: 'mainnet',
    id: '1',
    url: 'https://rpc.ankr.com/eth',
    explorer: 'https://etherscan.io',
  },
  {
    name: 'goerli',
    id: '5',
    url: 'https://rpc.ankr.com/eth_goerli',
    explorer: 'https://goerli.etherscan.io',
  },
  {
    name: 'polygon',
    id: '137',
    url: 'https://rpc.ankr.com/polygon',
    explorer: 'https://polygonscan.com',
  },
  {
    name: 'mumbai',
    id: '80001',
    url: 'https://rpc.ankr.com/polygon_mumbai',
    explorer: 'https://mumbai.polygonscan.com',
  },
];
