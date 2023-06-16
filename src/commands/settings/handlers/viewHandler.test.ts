import { viewHandler } from './viewHandler';
import { describe, beforeEach, expect, it, vi } from 'vitest';

import * as keys from '~/lib/keys';
import * as wallet from '~/lib/wallet.js';
import { messages } from '~/lib/constants.js';

describe('viewHandler', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    console.log = vi.fn(); // suppress console.log
    console.error = vi.fn(); // suppress console.error
  });

  it('should display Tenderly as enabled if Tenderly key exists', async () => {
    vi.spyOn(keys, 'getTenderlyKey').mockResolvedValue('tenderly-key');
    const consoleLogSpy = vi.spyOn(console, 'log');
    await viewHandler();
    expect(consoleLogSpy).toHaveBeenCalledWith('Tenderly', messages.ENABLED);
  });

  it('should display message for missing Tenderly key if Tenderly key does not exist', async () => {
    vi.spyOn(keys, 'getTenderlyKey').mockResolvedValue(null);
    const consoleLogSpy = vi.spyOn(console, 'log');
    await viewHandler();
    expect(consoleLogSpy).toHaveBeenCalledWith(messages.TENDERLY_NOT_FOUND);
  });

  it('should call displayWallet if private key exists', async () => {
    vi.spyOn(keys, 'getPrivateKey').mockResolvedValue('private-key');
    const displayWalletSpy = vi.spyOn(wallet, 'displayWallet');
    await viewHandler();
    expect(displayWalletSpy).toHaveBeenCalled();
  });

  it('should display message for missing private key if private key does not exist', async () => {
    vi.spyOn(keys, 'getPrivateKey').mockResolvedValue(null);
    const consoleLogSpy = vi.spyOn(console, 'log');
    await viewHandler();
    expect(consoleLogSpy).toHaveBeenCalledWith(messages.PRIVATE_KEY_NOT_FOUND);
  });

  it('should display an error message if an error is thrown', async () => {
    vi.spyOn(keys, 'getTenderlyKey').mockRejectedValue(
      new Error('error-message'),
    );
    const consoleErrorSpy = vi.spyOn(console, 'error');
    await viewHandler();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      messages.FAILED_TO_RETRIEVE_KEYS,
      new Error('error-message'),
    );
  });
});
