import { getTenderlySettings, setTenderlySettings } from '~/lib/keys.js';
import { strings } from '~/lib/strings';

import { TenderlySettings } from 'src/types/index.js';
import { confirmPrompt, tenderlyPrompt } from '~/lib/prompts.js';

export const tenderlyKeyHandler: (...args: any[]) => void | Promise<void> = async (
  tenderlyKeys: TenderlySettings,
) => {
  const existingTenderlySettings: TenderlySettings | null = await getTenderlySettings();

  if (existingTenderlySettings) {
    (await confirmPrompt(strings.OVERRIDE_TENDERLY))
      ? (tenderlyKeys = await tenderlyPrompt())
      : process.exit();
  } else {
    const hasKeys = Object.keys(tenderlyKeys).length > 0;
    tenderlyKeys = hasKeys ? tenderlyKeys : await tenderlyPrompt();
  }

  await setTenderlySettings(tenderlyKeys);
};
