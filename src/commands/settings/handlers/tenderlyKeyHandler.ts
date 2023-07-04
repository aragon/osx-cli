import { getTenderlySettings, setTenderlySettings } from '~/lib/keys.js';
import { logs } from '~/lib/constants.js';
import { confirmPrompt, tenderlyPrompt } from '~/lib/prompts.js';
import { viewHandler } from './viewHandler.js';
import { TenderlySettings } from 'src/types/index.js';

export const tenderlyKeyHandler: (
  ...args: any[]
) => void | Promise<void> = async (tenderlyKeys: TenderlySettings) => {
  const existingTenderlySettings: TenderlySettings | null =
    await getTenderlySettings();

  if (existingTenderlySettings) {
    (await confirmPrompt(logs.OVERRIDE_TENDERLY))
      ? (tenderlyKeys = await tenderlyPrompt())
      : process.exit();
  } else {
    tenderlyKeys = tenderlyKeys ? tenderlyKeys : await tenderlyPrompt();
  }

  await setTenderlySettings(tenderlyKeys);

  await viewHandler();
};
