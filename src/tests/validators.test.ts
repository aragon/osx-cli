import { describe, expect, it, vi } from 'vitest';

import * as constants from '~/lib/constants';
import { strings } from '~/lib/constants';
import * as keys from '~/lib/keys';

import { validateAddress, validatePrivateKey } from '~/lib/validators';

describe('validateAddress', () => {
  it('passes for valid address', () => {
    // no need to mock as function has no side effects
    validateAddress('0x47d80912400ef8f8224531EBEB1ce8f2ACf4b75a');
  });

  it('exits for invalid address', () => {
    const mockExitWithMessage = vi.fn();
    vi.spyOn(console, 'log');

    // mock exitWithMessage
    vi.spyOn(constants, 'exitWithMessage').mockImplementation(mockExitWithMessage);

    validateAddress('invalid');

    expect(mockExitWithMessage).toBeCalledWith(expect.stringContaining('Invalid Ethereum address'));
    expect(console.log).not.toBeCalled(); // no console.log
  });

  it('returns early if address undefined', () => {
    validateAddress(undefined);
    // no assertions needed, just ensure no crash
  });
});

describe('validatePrivateKey', () => {
  it('exits if private key does not exist', async () => {
    const mockExitWithMessage = vi.fn();
    vi.spyOn(constants, 'exitWithMessage').mockImplementation(mockExitWithMessage);

    // mock getPrivateKey to return undefined
    vi.spyOn(keys, 'getPrivateKey').mockResolvedValue(undefined);

    await validatePrivateKey();

    expect(mockExitWithMessage).toBeCalledWith(strings.PRIVATE_KEY_NOT_FOUND);
  });
});
