import chalk from 'chalk';

import { getPrivateKey, getTenderlyKey } from '../../../lib/keys.js';
import { displayWallet } from '../../../lib/wallet.js';

export const viewHandler: (
  ...args: unknown[]
) => void | Promise<void> = async () => {
  try {
    // Retrieve the private key and Tenderly API key
    const privateKey = await getPrivateKey();
    const tenderlyKey = await getTenderlyKey();

    // Check if the Tenderly key exists
    if (tenderlyKey) {
      // Display the Tenderly key
      console.log('Tenderly', chalk.green('enabled'));
    } else {
      console.log(
        chalk.yellow(
          'No Tenderly key found. You can use the "new" command to store a Tenderly key.',
        ),
      );
    }

    // Check if the private key exists
    if (privateKey) {
      await displayWallet();
    } else {
      console.log(
        chalk.red(
          'No private key found. Please use the "new" command to store a private key.',
        ),
      );
    }
  } catch (error) {
    console.error(chalk.red('Failed to retrieve keys:'), error);
  }
};
