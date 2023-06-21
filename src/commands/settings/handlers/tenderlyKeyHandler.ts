import { getTenderlyKey, setTenderlyKey } from '~/lib/keys.js';
import { messages } from '~/lib/constants.js';
import { confirmPrompt, tenderlyKeyPrompt } from '~/lib/prompts.js';
import { viewHandler } from './viewHandler.js';

export const tenderlyKeyHandler: (
  ...args: any[]
) => void | Promise<void> = async (tenderlyKey: string) => {
  const existingTenderlyKey = await getTenderlyKey();

  if (existingTenderlyKey) {
    (await confirmPrompt(messages.OVERRIDE_TENDERLY))
      ? (tenderlyKey = await tenderlyKeyPrompt())
      : process.exit();
  } else {
    tenderlyKey = tenderlyKey ? tenderlyKey : await tenderlyKeyPrompt();
  }

  await setTenderlyKey(tenderlyKey);

  await viewHandler();
};
