import { getPrivateKey, getTenderlySettings } from '~/lib/keys.js';
import { displayWallet } from '~/lib/wallet.js';
import { strings } from '~/lib/constants.js';

export const viewHandler: (...args: unknown[]) => void | Promise<void> = async () => {
  try {
    // Retrieve the private key and Tenderly API key
    const privateKey = await getPrivateKey();
    const tenderlyKey = await getTenderlySettings();

    // Check if the Tenderly key exists
    if (tenderlyKey) {
      console.log('Tenderly', strings.ENABLED);
    } else {
      console.log(strings.TENDERLY_NOT_FOUND);
    }

    // Check if the private key exists
    if (privateKey) {
      await displayWallet();
    } else {
      console.log(strings.PRIVATE_KEY_NOT_FOUND);
    }
  } catch (error) {
    console.error(strings.FAILED_TO_RETRIEVE_KEYS, error);
  }
};
