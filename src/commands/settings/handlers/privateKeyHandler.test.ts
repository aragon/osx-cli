import { privateKeyHandler } from './privateKeyHandler';
import { beforeEach, beforeAll, describe, expect, it, vi } from 'vitest';

import * as keys from '../../../lib/keys';
import * as prompts from '../../../lib/prompts.js';
import * as viewHandlerModule from './viewHandler.js';
import process from 'process';

describe('privateKeyHandler', () => {
  beforeAll(() => {
    console.log = vi.fn(); // suppress console.log
    console.error = vi.fn(); // suppress console.error
  });

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should prompt and store a new private key if an existing key is found and user confirms', async () => {
    vi.spyOn(keys, 'getPrivateKey').mockResolvedValue('existing-key');
    vi.spyOn(prompts, 'confirmPrompt').mockResolvedValue(true);
    vi.spyOn(prompts, 'privateKeyPrompt').mockResolvedValue('new-private-key');

    const setPrivateKeySpy = vi.spyOn(keys, 'setPrivateKey'); // Add this line to spy on 'setPrivateKey'

    const viewHandlerSpy = vi.spyOn(viewHandlerModule, 'viewHandler');
    await privateKeyHandler();
    expect(setPrivateKeySpy).toHaveBeenCalledWith('new-private-key'); // Update this line to use the spy variable
    expect(viewHandlerSpy).toHaveBeenCalled();
  });

  it('should exit the process if an existing key is found and user declines', async () => {
    vi.spyOn(keys, 'getPrivateKey').mockResolvedValue('existing-key');
    vi.spyOn(prompts, 'confirmPrompt').mockResolvedValue(false);
    // @ts-ignore
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {});
    await privateKeyHandler();
    expect(exitSpy).toHaveBeenCalled();
  });

  it('should prompt and store a new private key if no existing key is found and none provided', async () => {
    vi.spyOn(keys, 'getPrivateKey').mockResolvedValue(null);
    vi.spyOn(prompts, 'privateKeyPrompt').mockResolvedValue('new-private-key');
    const viewHandlerSpy = vi.spyOn(viewHandlerModule, 'viewHandler');
    await privateKeyHandler();
    expect(keys.setPrivateKey).toHaveBeenCalledWith('new-private-key');
    expect(viewHandlerSpy).toHaveBeenCalled();
  });

  it('should store the provided private key if no existing key is found and one is provided', async () => {
    vi.spyOn(keys, 'getPrivateKey').mockResolvedValue(null);
    vi.spyOn(prompts, 'privateKeyPrompt').mockResolvedValue(
      'should-not-use-this',
    );
    const viewHandlerSpy = vi.spyOn(viewHandlerModule, 'viewHandler');
    await privateKeyHandler('provided-private-key');
    expect(keys.setPrivateKey).toHaveBeenCalledWith('provided-private-key');
    expect(viewHandlerSpy).toHaveBeenCalled();
  });
});
