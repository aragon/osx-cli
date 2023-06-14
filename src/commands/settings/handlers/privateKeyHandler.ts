import { getPrivateKey, setPrivateKey } from '../../../lib/keys.js';
import { confirmPrompt, privateKeyPrompt } from '../../../lib/prompts.js';
import { viewHandler } from './viewHandler.js';

export const privateKeyHandler: (
  ...args: unknown[]
) => void | Promise<void> = async (privateKey: string) => {
  const existingPrivateKey = await getPrivateKey();

  // 2.1 Is there an existing private key?
  if (existingPrivateKey) {
    // 2.2 Prompt the user to overwrite the existing private key
    (await confirmPrompt(
      'Seems like you already have a private key stored. Are you sure you want to override it with a new one?',
    ))
      ? // 2.3 If yes, prompt the user for a new private key
        (privateKey = await privateKeyPrompt())
      : // 2.4 If not exit the process
        process.exit();
  } else {
    // 2.5 If no private key exists and user did not provide in arguments, prompt the user for one
    privateKey = privateKey ? privateKey : await privateKeyPrompt();
  }

  // 3 Store the private key
  await setPrivateKey(privateKey);

  // 4 Display the settings
  await viewHandler();
};
