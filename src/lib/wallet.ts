import chalk from 'chalk';
import { Wallet, ethers } from 'ethers';
import { getPrivateKey } from './keys.js';
import { networks } from './constants.js';

export const getWallet = async (): Promise<Wallet | null> => {
  const privateKey = await getPrivateKey();
  if (!privateKey) return null;

  return new Wallet(privateKey);
};

export const displayWallet = async (): Promise<void> => {
  const wallet = await getWallet();
  const address = wallet?.address ?? 'No wallet found';
  console.log('Wallet address:', chalk.green(address), '\n');

  for (const network of networks) {
    try {
      const provider = new ethers.providers.JsonRpcProvider(network.url);
      const balance = ethers.utils.formatEther(await provider.getBalance(address));
      console.log('📡 --- ' + network.name + ' ---- 📡 ');
      console.log('balance:', balance);
      console.log('nonce: ', await provider.getTransactionCount(address));
      console.log();
    } catch (error) {
      console.log(' -- ' + network.name + ' --  -- -- 📡 ');
      console.log('error:', error);
    }
  }
};
