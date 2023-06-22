import chalk from 'chalk';

export const warning = (message: string): string => chalk.yellow(message);
export const error = (message: string): string => chalk.red(message);
export const exitWithMessage = (message: string): void => {
  console.log(error(message));
  process.exit(0);
};

export const logs = {
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
  SIMULATE_DEPLOYMENT: warning('Do you want to simulate the deployment?'),
  CONTRACT_BUILD_NOT_FOUND: (contract: string) =>
    error(`${contract}.sol build not found, did you compile?`),
};

export const networks = [
  {
    name: 'mainnet',
    url: 'https://rpc.ankr.com/eth',
  },
  {
    name: 'goerli',
    url: 'https://rpc.ankr.com/eth_goerli',
  },
  {
    name: 'polygon',
    url: 'https://rpc.ankr.com/polygon',
  },
  {
    name: 'mumbai',
    url: 'https://rpc.ankr.com/polygon_mumbai',
  },
] as const;
