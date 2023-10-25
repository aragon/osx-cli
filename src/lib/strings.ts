import chalk from 'chalk';

export const warning = (message: string): string => chalk.yellow(message);
export const error = (message: string): string => chalk.red(message);
export const success = (message: string): string => chalk.greenBright.bold(message);

export const exitWithMessage = (message: string): void => {
  console.log(error(message));
  process.exit(0);
};

const prompts = {
  BUILD_METADATA_PROMPT: `Select your ${warning('Build metadata')} file:`,
  BUILD_FOLDER: warning(`Build Folder not detected. \nPlease enter the name of the build folder:`),
  CONFIRM_PUBLISH: warning('Do you want to publish your plugin?'),
  CONTRACT_ADDRESS: warning('Please enter a contract address:'),
  MAINTAINER_ADDRESS: warning("Please enter a maintainer's address:"),
  METADATA_DOWNLOADED: warning('Metadata Downloaded'),
  NETWORK_SELECTION: warning('Please select a network:'),
  OVERRIDE_PK: warning(
    'Seems like you already have a private key stored. Are you sure you want to override it with a new one?',
  ),
  OVERRIDE_TENDERLY: warning(
    'Seems like you already have a Tenderly key stored. Are you sure you want to override it with a new one?',
  ),
  PRIVATE_KEY: warning('Please enter a private key:'),
  PROCEED_WITH_DEPLOYMENT: warning('Do you want to proceed with the deployment of your contract?'),
  RELEASE_METADATA_PROMPT: `Select your ${warning('Release metadata')} file:`,
  SETUP_NAME: warning(`Please enter the name of your Plugin's Setup Contract (i.e. TestSetup)`),
  SIMULATE_DEPLOYMENT: warning('Do you want to simulate the deployment?'),
  SUBDOMAIN_PROMPT: warning('Please enter a subdomain:'),
  TENDERLY_KEY: warning('Please enter a Tenderly key:'),
  TENDERLY_PROJECT: warning('Please enter your Tenderly project name:'),
  TENDERLY_USERNAME: warning('Please enter your Tenderly username:'),
};

const errors = {
  ABORTED: error('Aborted.'),
  CANNOT_FIND_REPO: (repoName: string) => error(`Cannot find repo ${repoName}`),
  CONTRACT_BUILD_NOT_FOUND: (contract: string) => error(`${contract}.sol build not found, did you compile?`),
  DEPLOYMENT_FAILED: error('Contract deployment failed'),
  FAILED_TO_RETRIEVE_KEYS: error('Failed to retrieve keys:'),
  IPFS_NOT_VALID_JSON: error('IPFS content is not valid JSON'),
  IPFS_UPLOAD_ERROR: error('Failed to upload to IPFS:'),
  INVALID_BUILD_METADATA: error('Invalid build metadata'),
  INVALID_RELEASE_METADATA: error('Invalid release metadata'),
  INVALID_SUBDOMAIN: error('Invalid subdomain'),
  NO_NAME_PROVIDED: error('No name provided'),
  NO_FILES_FOR_CID: error('No files found for the given CID'),
  NO_DESCRIPTION_PROVIDED: error('No description provided'),
  NOT_NETWORK: (network: string | undefined) => error(`Network ${network} not found`),
  PRIVATE_KEY_NOT_FOUND: error(
    chalk.red.bold(
      `Private key not found. Please set it using the ${chalk.bold(
        'aragon settings set-private-key',
      )} command.\n`,
    ),
  ),
  TENDERLY_NOT_FOUND: error(
    chalk.yellow(
      `Tenderly settings not found. create an account at https://tenderly.co/ then run the ${chalk.bold(
        'aragon settings set-tenderly-settings',
      )} command.\n`,
    ),
  ),
  WEB_3_STORAGE_NOT_FOUND: error('No Web3 Storage key found'),
};

const logs = {
  BANNER: `⚡️Build, Deploy, Publish, and Interact with Aragon Plugins - Blazingly Fast ⚡️ `,
  DEPLOYED: (contract: string, address: string | undefined, network: string) =>
    `\n\n🎉 ${chalk.greenBright.bold(contract)}: deployed to ${address} on ${chalk.green.bold(network)}`,
  DOWNLOADING_METADATA: warning('Downloading metadata...'),
  ENABLED: chalk.green('enabled'),
  EXPLORER: (explorer: string, txHash: string | undefined) => success(`🔗 ${explorer}/tx/${txHash}`),
  PUBLISHING: warning('Publishing...'),
  SIMULATING: warning('Simulating...'),
  SUBDOMAIN_WARNING: warning(
    "Keep in mind that your plugin's subdomain will only be resolved in mainnet, as is the only network currently supported by ENS",
  ),
};

export const strings = {
  ...errors,
  ...prompts,
  ...logs,
};
