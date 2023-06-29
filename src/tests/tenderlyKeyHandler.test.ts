import { TenderlySettings } from 'src/types';

import { beforeEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { tenderlyKeyHandler } from '~/commands/settings/handlers/tenderlyKeyHandler';

import * as keys from '~/lib/keys';
import * as prompts from '~/lib/prompts.js';

vi.mock('~/lib/keys');

describe('tenderlyKeyHandler', () => {
  const mockFunction = (() => {}) as any as () => never;

  beforeAll(() => {
    console.log = vi.fn(); // suppress console.log
  });

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should prompt and store a new key if no existing key is found and none provided', async () => {
    const newSettings: TenderlySettings = {
      tenderlyKey: 'new-key',
      tenderlyProject: 'new-project',
      tenderlyUsername: 'new-username',
    };

    vi.spyOn(keys, 'getTenderlySettings').mockResolvedValue(null);
    vi.spyOn(prompts, 'tenderlyPrompt').mockResolvedValue(newSettings);

    await tenderlyKeyHandler();

    expect(keys.setTenderlySettings).toHaveBeenCalledWith(newSettings);
  });

  it('should prompt and store new settings if an existing key is found and user confirms', async () => {
    const existingSettings: TenderlySettings = {
      tenderlyKey: 'existing-key',
      tenderlyProject: 'existing-project',
      tenderlyUsername: 'existing-username',
    };
    const newSettings: TenderlySettings = {
      tenderlyKey: 'new-key',
      tenderlyProject: 'new-project',
      tenderlyUsername: 'new-username',
    };

    vi.spyOn(keys, 'getTenderlySettings').mockResolvedValue(existingSettings);
    vi.spyOn(prompts, 'confirmPrompt').mockResolvedValue(true);
    vi.spyOn(prompts, 'tenderlyPrompt').mockResolvedValue(newSettings);

    await tenderlyKeyHandler();

    expect(keys.setTenderlySettings).toHaveBeenCalledWith(newSettings);
  });

  it('should exit the process if an existing key is found and user declines', async () => {
    const existingSettings: TenderlySettings = {
      tenderlyKey: 'existing-key',
      tenderlyProject: 'existing-project',
      tenderlyUsername: 'existing-username',
    };

    vi.spyOn(keys, 'getTenderlySettings').mockResolvedValue(existingSettings);
    vi.spyOn(prompts, 'confirmPrompt').mockResolvedValue(false);
    vi.spyOn(process, 'exit').mockImplementation(mockFunction);

    await tenderlyKeyHandler();

    expect(process.exit).toHaveBeenCalled();
  });

  it('should store the provided settings if no existing key is found and one is provided', async () => {
    const providedSettings: TenderlySettings = {
      tenderlyKey: 'provided-key',
      tenderlyProject: 'provided-project',
      tenderlyUsername: 'provided-username',
    };

    vi.spyOn(keys, 'getTenderlySettings').mockResolvedValue(null);

    await tenderlyKeyHandler(providedSettings);

    expect(keys.setTenderlySettings).toHaveBeenCalledWith(providedSettings);
  });

  return Promise.resolve();
});
