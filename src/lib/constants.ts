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
    subgraph: 'https://subgraph.satsuma-prod.com/qHR2wGfc5RLi6/aragon/osx-mainnet/version/v1.3.0/api',
  },
  {
    name: 'goerli',
    id: '5',
    url: 'https://rpc.ankr.com/eth_goerli',
    explorer: 'https://goerli.etherscan.io',
    subgraph: 'https://subgraph.satsuma-prod.com/qHR2wGfc5RLi6/aragon/osx-goerli/version/v1.3.0/api',
  },
  {
    name: 'polygon',
    id: '137',
    url: 'https://rpc.ankr.com/polygon',
    explorer: 'https://polygonscan.com',
    subgraph: 'https://subgraph.satsuma-prod.com/qHR2wGfc5RLi6/aragon/osx-polygon/version/v1.3.0/api',
  },
  {
    name: 'mumbai',
    id: '80001',
    url: 'https://rpc.ankr.com/polygon_mumbai',
    explorer: 'https://mumbai.polygonscan.com',
    subgraph: 'https://subgraph.satsuma-prod.com/qHR2wGfc5RLi6/aragon/osx-mumbai/version/v1.3.0/api',
  },
  {
    name: 'baseMainnet',
    id: '8453',
    url: 'https://rpc.ankr.com/base',
    explorer: 'https://basescan.org',
    subgraph: 'https://subgraph.satsuma-prod.com/qHR2wGfc5RLi6/aragon/osx-baseMainnet/api',
  },
  {
    name: 'baseGoerli',
    id: '84531',
    url: 'https://rpc.ankr.com/base_goerli',
    explorer: '	https://goerli.basescan.org',
    subgraph: 'https://subgraph.satsuma-prod.com/qHR2wGfc5RLi6/aragon/osx-baseGoerli/api'
  }
];
