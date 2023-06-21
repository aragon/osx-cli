import { getPrivateKey, getTenderlyKey } from '~/lib/keys.js';
import { displayWallet } from '~/lib/wallet.js';
import { messages } from '~/lib/constants.js';

export const viewHandler: (
  ...args: unknown[]
) => void | Promise<void> = async () => {
  try {
    // Retrieve the private key and Tenderly API key
    const privateKey = await getPrivateKey();
    const tenderlyKey = await getTenderlyKey();

    // Check if the Tenderly key exists
    if (tenderlyKey) console.log('Tenderly', messages.ENABLED);
    else console.log(messages.TENDERLY_NOT_FOUND);

    // Check if the private key exists
    if (privateKey) await displayWallet();
    else console.log(messages.PRIVATE_KEY_NOT_FOUND);
  } catch (error) {
    console.error(messages.FAILED_TO_RETRIEVE_KEYS, error);
  }
};
