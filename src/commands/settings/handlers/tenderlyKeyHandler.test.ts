import { tenderlyKeyHandler } from './tenderlyKeyHandler';
import { beforeEach, beforeAll, describe, expect, it, vi } from 'vitest';

import * as keys from '~/lib/keys';
import * as prompts from '~/lib/prompts.js';

vi.mock('~/lib/keys');

describe('tenderlyKeyHandler', () => {
  beforeAll(() => {
    console.log = vi.fn(); // suppress console.log
  });

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should prompt and store a new key if no existing key is found and none provided', async () => {
    vi.spyOn(keys, 'getTenderlyKey').mockResolvedValue(null);
    vi.spyOn(prompts, 'tenderlyKeyPrompt').mockResolvedValue('new-key');
    await tenderlyKeyHandler();
    expect(keys.setTenderlyKey).toHaveBeenCalledWith('new-key');
  });

  it('should prompt and store a new key if an existing key is found and user confirms', async () => {
    vi.spyOn(keys, 'getTenderlyKey').mockResolvedValue('existing-key');
    vi.spyOn(prompts, 'confirmPrompt').mockResolvedValue(true);
    vi.spyOn(prompts, 'tenderlyKeyPrompt').mockResolvedValue('new-key');
    await tenderlyKeyHandler();
    expect(keys.setTenderlyKey).toHaveBeenCalledWith('new-key');
  });

  it('should exit the process if an existing key is found and user declines', async () => {
    vi.spyOn(keys, 'getTenderlyKey').mockResolvedValue('existing-key');
    vi.spyOn(prompts, 'confirmPrompt').mockResolvedValue(false);
    vi.spyOn(process, 'exit').mockImplementation(() => {});

    await tenderlyKeyHandler();
    expect(process.exit).toHaveBeenCalled();
  });

  it('should store the provided key if no existing key is found and one is provided', async () => {
    vi.spyOn(keys, 'getTenderlyKey').mockResolvedValue(null);
    vi.spyOn(prompts, 'tenderlyKeyPrompt').mockResolvedValue(
      'should-not-use-this',
    );
    await tenderlyKeyHandler('provided-key');
    expect(keys.setTenderlyKey).toHaveBeenCalledWith('provided-key');
  });
  return Promise.resolve();
});
