import { TenderlySettings } from 'src/types';

import { beforeEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { tenderlyKeyHandler } from '~/commands/settings/handlers/tenderlyKeyHandler';

import * as keys from '~/lib/keys';
import * as prompts from '~/lib/prompts.js';

import { mockTenderlySettings } from './mocks';

vi.mock('~/lib/keys');

describe('tenderlyKeyHandler', () => {
  const mockFunction = (() => {}) as any as () => never;

  beforeAll(() => {
    console.log = vi.fn();
  });

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should prompt and store a new key if no existing key is found and none provided', async () => {
    vi.spyOn(keys, 'getTenderlySettings').mockResolvedValue(null);
    vi.spyOn(prompts, 'tenderlyPrompt').mockResolvedValue(mockTenderlySettings);

    await tenderlyKeyHandler();
    expect(keys.setTenderlySettings).toHaveBeenCalledWith(mockTenderlySettings);
  });

  it('should prompt and store new settings if an existing key is found and user confirms', async () => {
    const newSettings: TenderlySettings = {
      tenderlyKey: 'new-key',
      tenderlyProject: 'new-project',
      tenderlyUsername: 'new-username',
    };

    vi.spyOn(keys, 'getTenderlySettings').mockResolvedValue(
      mockTenderlySettings,
    );
    vi.spyOn(prompts, 'confirmPrompt').mockResolvedValue(true);
    vi.spyOn(prompts, 'tenderlyPrompt').mockResolvedValue(newSettings);

    await tenderlyKeyHandler();
    expect(keys.setTenderlySettings).toHaveBeenCalledWith(newSettings);
  });

  it('should exit the process if an existing key is found and user declines', async () => {
    vi.spyOn(keys, 'getTenderlySettings').mockResolvedValue(
      mockTenderlySettings,
    );
    vi.spyOn(prompts, 'confirmPrompt').mockResolvedValue(false);
    vi.spyOn(process, 'exit').mockImplementation(mockFunction);

    await tenderlyKeyHandler();
    expect(process.exit).toHaveBeenCalled();
  });

  it('should store the provided settings if no existing key is found and one is provided', async () => {
    vi.spyOn(keys, 'getTenderlySettings').mockResolvedValue(null);
    await tenderlyKeyHandler(mockTenderlySettings);

    expect(keys.setTenderlySettings).toHaveBeenCalledWith(mockTenderlySettings);
  });

  return Promise.resolve();
});
