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

export const strings = {
  ABORTED: error('Aborted.'),
  BUILD_FOLDER: success(
    `Build Folder not detected. \nPlease enter the name of the build folder:`,
  ),
  CONFIRM_PUBLISH: warning('Do you want to publish your plugin?'),
  CONTRACT_BUILD_NOT_FOUND: (contract: string) =>
    error(`${contract}.sol build not found, did you compile?`),
  BUILD_METADATA_PROMPT: `Select your ${chalk.blue('Build metadata')} file:`,
  DEPLOYED: (contract: string, address: string | undefined, network: string) =>
    `\n\n🎉 ${chalk.greenBright.bold(
      contract,
    )}: deployed to ${address} on ${chalk.green.bold(network)}`,
  DEPLOYMENT_FAILED: error('Contract deployment failed'),
  ENABLED: chalk.green('enabled'),
  EXPLORER: (explorer: string, txHash: string | undefined) =>
    success(`🔗 ${explorer}/tx/${txHash}`),
  FAILED_TO_RETRIEVE_KEYS: error('Failed to retrieve keys:'),
  NETWORK_SELECTION: success('Please select a network:'),
  NOT_NETWORK: (network: string | undefined) =>
    error(`Network ${network} not found`),
  OVERRIDE_PK: warning(
    'Seems like you already have a private key stored. Are you sure you want to override it with a new one?',
  ),
  OVERRIDE_TENDERLY: warning(
    'Seems like you already have a Tenderly key stored. Are you sure you want to override it with a new one?',
  ),
  PRIVATE_KEY: success('Please enter a private key:'),
  PRIVATE_KEY_NOT_FOUND: error(
    'No private key found. Please use the "new" command to store a private key.',
  ),
  PROCEED_WITH_DEPLOYMENT: warning('Do you want to proceed with the deployment of your contract?'),
  RELEASE_METADATA_PROMPT: `Select your ${chalk.blue('Release metadata')} file:`,
  SETUP_NAME: success(`Please enter the name of your Plugin's Setup Contract (i.e. TestSetup)`),
  SIMULATE_DEPLOYMENT: warning('Do you want to simulate the deployment?'),
  TENDERLY_KEY: success('Please enter a Tenderly key:'),
  TENDERLY_NOT_FOUND: error(
    'No Tenderly key found. You can use the "new" command to store a Tenderly key.',
  ),
  TENDERLY_PROJECT: success('Please enter your Tenderly project name:'),
  TENDERLY_USERNAME: success('Please enter your Tenderly username:'),
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
