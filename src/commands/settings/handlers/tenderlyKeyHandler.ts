import { getTenderlyKey, setTenderlyKey } from '../../../lib/keys.js';
import { confirmPrompt, tenderlyKeyPrompt } from '../../../lib/prompts.js';
import { viewHandler } from './viewHandler.js';

export const tenderlyKeyHandler: (
  ...args: unknown[]
) => void | Promise<void> = async (tenderlyKey: string) => {
  const existingTenderlyKey = await getTenderlyKey();

  if (existingTenderlyKey) {
    (await confirmPrompt(
      'Seems like you already have a Tenderly key stored. Are you sure you want to override it with a new one?',
    ))
      ? (tenderlyKey = await tenderlyKeyPrompt())
      : // 2.4 If not exit the process
        process.exit();
  } else {
    // 2.5 If no private key exists and user did not provide in arguments, prompt the user for one
    tenderlyKey = tenderlyKey ? tenderlyKey : await tenderlyKeyPrompt();
  }

  // 3 Store the private key
  await setTenderlyKey(tenderlyKey);

  // 4 Display the settings
  await viewHandler();
};
