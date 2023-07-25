import chalk from 'chalk';
import { Network } from 'src/types';
import Table from 'cli-table3';

export const warning = (message: string): string => chalk.yellow(message);
export const error = (message: string): string => chalk.red(message);
export const success = (message: string): string => chalk.greenBright.bold(message);
export const exitWithMessage = (message: string): void => {
  console.log(error(message));
  process.exit(0);
};

/**
 * Logs an array of key-value pairs in tabular format using the 'Table' class and outputs it to the console.
 *
 * @param {Array<Record<string, string>>} keyValues - An array of key-value pairs represented as objects.
 * Each object in the array should have string properties for keys and values.
 * Example: [{ key1: value1 }, { key2: value2 }, ...]
 * @returns {void} - This function does not return any value; it logs the table directly to the console.
 */
export const logTable = (keyValues: Array<Record<string, string>>): void => {
  const table = new Table();
  keyValues.forEach((kv) => table.push(kv));
  console.log(table.toString());
};

export const strings = {
  ABORTED: error('Aborted.'),
  BUILD_FOLDER: success(`Build Folder not detected. \nPlease enter the name of the build folder:`),
  BUILD_METADATA_PROMPT: `Select your ${chalk.blue('Build metadata')} file:`,
  CANNOT_FIND_REPO: (repoName: string) => error(`Cannot find repo ${repoName}`),
  CONFIRM_PUBLISH: warning('Do you want to publish your plugin?'),
  CONTRACT_ADDRESS: success('Please enter a contract address:'),
  CONTRACT_BUILD_NOT_FOUND: (contract: string) => error(`${contract}.sol build not found, did you compile?`),
  DEPLOYED: (contract: string, address: string | undefined, network: string) =>
    `\n\n🎉 ${chalk.greenBright.bold(contract)}: deployed to ${address} on ${chalk.green.bold(network)}`,
  DEPLOYMENT_FAILED: error('Contract deployment failed'),
  DOWNLOADING_METADATA: warning('Downloading metadata...'),
  ENABLED: chalk.green('enabled'),
  EXPLORER: (explorer: string, txHash: string | undefined) => success(`🔗 ${explorer}/tx/${txHash}`),
  FAILED_TO_RETRIEVE_KEYS: error('Failed to retrieve keys:'),
  IPFS_NOT_VALID_JSON: error('IPFS content is not valid JSON'),
  IPFS_UPLOAD_ERROR: error('Failed to upload to IPFS:'),
  INVALID_BUILD_METADATA: error('Invalid build metadata'),
  INVALID_RELEASE_METADATA: error('Invalid release metadata'),
  INVALID_SUBDOMAIN: error('Invalid subdomain'),
  MAINTAINER_ADDRESS: success("Please enter a maintainer's address:"),
  METADATA_DOWNLOADED: success('Metadata Downloaded'),
  NETWORK_SELECTION: success('Please select a network:'),
  NO_NAME_PROVIDED: error('No name provided'),
  NO_FILES_FOR_CID: error('No files found for the given CID'),
  NO_DESCRIPTION_PROVIDED: error('No description provided'),
  NOT_NETWORK: (network: string | undefined) => error(`Network ${network} not found`),
  OVERRIDE_PK: warning(
    'Seems like you already have a private key stored. Are you sure you want to override it with a new one?',
  ),
  OVERRIDE_TENDERLY: warning(
    'Seems like you already have a Tenderly key stored. Are you sure you want to override it with a new one?',
  ),
  PRIVATE_KEY: success('Please enter a private key:'),
  PRIVATE_KEY_NOT_FOUND: error(
    'No private key found. Please use the "settings set-pk" command to store a private key.',
  ),
  PROCEED_WITH_DEPLOYMENT: warning('Do you want to proceed with the deployment of your contract?'),
  PUBLISHING: warning('Publishing...'),
  RELEASE_METADATA_PROMPT: `Select your ${chalk.blue('Release metadata')} file:`,
  SETUP_NAME: success(`Please enter the name of your Plugin's Setup Contract (i.e. TestSetup)`),
  SIMULATE_DEPLOYMENT: warning('Do you want to simulate the deployment?'),
  SIMULATING: warning('Simulating...'),
  SUBDOMAIN_PROMPT: success('Please enter a subdomain:'),
  TENDERLY_KEY: success('Please enter a Tenderly key:'),
  TENDERLY_NOT_FOUND: error(
    'No Tenderly key found. You can use the "settings set-tenderly" command to store a Tenderly key.',
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
    subgraph: 'https://subgraph.satsuma-prod.com/qHR2wGfc5RLi6/aragon/osx-mainnet/version/v1.1.1/api',
  },
  {
    name: 'goerli',
    id: '5',
    url: 'https://rpc.ankr.com/eth_goerli',
    explorer: 'https://goerli.etherscan.io',
    subgraph: 'https://subgraph.satsuma-prod.com/qHR2wGfc5RLi6/aragon/osx-goerli/version/v1.1.1/api',
  },
  {
    name: 'polygon',
    id: '137',
    url: 'https://rpc.ankr.com/polygon',
    explorer: 'https://polygonscan.com',
    subgraph: 'https://subgraph.satsuma-prod.com/qHR2wGfc5RLi6/aragon/osx-polygon/version/v1.1.1/api',
  },
  {
    name: 'mumbai',
    id: '80001',
    url: 'https://rpc.ankr.com/polygon_mumbai',
    explorer: 'https://mumbai.polygonscan.com',
    subgraph: 'https://subgraph.satsuma-prod.com/qHR2wGfc5RLi6/aragon/osx-mumbai/version/v1.1.1/api',
  },
];

export const WEB_3_STORAGE =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDU5MjFCRTY0ZDk1MkU5Y2FlNzQ1RURENEExY2FFRkEzOTJCNDdhNGYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjczNzczNDIxODUsIm5hbWUiOiJhcmFnb24ifQ.OMXTNr32vPvnccsW_3PrbQUaELUD7hQesJm0HiBapoE';
