import { Network } from 'src/types';
import Table from 'cli-table3';

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

export const net = {
  mainnet: {
    name: 'mainnet',
    id: '1',
    url: 'https://rpc.ankr.com/eth',
    explorer: 'https://etherscan.io',
    subgraph: 'https://subgraph.satsuma-prod.com/qHR2wGfc5RLi6/aragon/osx-mainnet/version/v1.1.1/api',
  },
  goerli: {
    name: 'goerli',
    id: '5',
    url: 'https://rpc.ankr.com/eth_goerli',
    explorer: 'https://goerli.etherscan.io',
    subgraph: 'https://subgraph.satsuma-prod.com/qHR2wGfc5RLi6/aragon/osx-goerli/version/v1.1.1/api',
  },
  polygon: {
    name: 'polygon',
    id: '137',
    url: 'https://rpc.ankr.com/polygon',
    explorer: 'https://polygonscan.com',
    subgraph: 'https://subgraph.satsuma-prod.com/qHR2wGfc5RLi6/aragon/osx-polygon/version/v1.1.1/api',
  },
  mumbai: {
    name: 'mumbai',
    id: '80001',
    url: 'https://rpc.ankr.com/polygon_mumbai',
    explorer: 'https://mumbai.polygonscan.com',
    subgraph: 'https://subgraph.satsuma-prod.com/qHR2wGfc5RLi6/aragon/osx-mumbai/version/v1.1.1/api',
  },
} as const;

type Net = (typeof net)[keyof typeof net];

export const gotoNet = (net: Net) => {
  console.log(net.explorer);
};
