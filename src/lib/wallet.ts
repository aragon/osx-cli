import chalk from 'chalk';

import { Wallet, ethers } from 'ethers';
import { getPrivateKey } from './keys.js';

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

export const getWallet = async (): Promise<Wallet> => {
  const privateKey = await getPrivateKey();
  return new Wallet(privateKey);
};

export const displayWallet = async (): Promise<void> => {
  const wallet = await getWallet();
  console.log('Wallet address:', chalk.green(wallet.address));
  console.log();
  // qrcode.generate(wallet.address);

  for (const network of networks) {
    try {
      const provider = new ethers.JsonRpcProvider(network.url);
      const balance = ethers.formatEther(
        await provider.getBalance(wallet.address),
      );
      console.log('📡 --- ' + network.name + ' ---- 📡 ');
      console.log('balance:', balance);
      console.log(
        'nonce: ',
        await provider.getTransactionCount(wallet.address),
      );
      console.log();
    } catch (error) {
      console.log(' -- ' + network.name + ' --  -- -- 📡 ');
      console.log('error:', error);
    }
  }
};
