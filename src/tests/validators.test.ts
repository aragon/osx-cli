import { describe, expect, it, vi, beforeAll } from 'vitest';

import * as strings from '~/lib/strings';
import * as keys from '~/lib/keys';

import {
  validateAddress,
  validateBuild,
  validateNetwork,
  validatePrivateKey,
  validateRelease,
  validateSubdomain,
} from '~/lib/validators';

beforeAll(() => {
  console.log = vi.fn(); // suppress console.log
  console.error = vi.fn(); // suppress console.error
});

describe('validateAddress', () => {
  it('passes for valid address', () => {
    // no need to mock as function has no side effects
    validateAddress('0x47d80912400ef8f8224531EBEB1ce8f2ACf4b75a');
  });

  it('exits for invalid address', () => {
    const mockExitWithMessage = vi.fn();
    vi.spyOn(console, 'log');

    // mock exitWithMessage
    vi.spyOn(strings, 'exitWithMessage').mockImplementation(mockExitWithMessage);

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
    vi.spyOn(strings, 'exitWithMessage').mockImplementation(mockExitWithMessage);

    // mock getPrivateKey to return undefined
    vi.spyOn(keys, 'getPrivateKey').mockResolvedValue(null);

    await validatePrivateKey();
    expect(mockExitWithMessage).toBeCalledWith(strings.strings.PRIVATE_KEY_NOT_FOUND);
  });
});

describe('validateBuild', () => {
  it('returns early if build undefined', () => {
    validateBuild(undefined);
    // no assertions needed, just ensure no crash
  });

  it('logs invalid if build is a string', () => {
    vi.spyOn(console, 'log');
    validateBuild('string');
    expect(console.log).toBeCalledWith(strings.strings.INVALID_BUILD_METADATA);
  });
});

describe('validateRelease', () => {
  it('returns early if release undefined', () => {
    validateRelease(undefined);
    // no assertions needed, just ensure no crash
  });

  it(`logs invalid if release is a string`, () => {
    vi.spyOn(console, 'log');
    validateRelease('string');
    expect(console.log).toBeCalledWith(strings.strings.INVALID_RELEASE_METADATA);
  });
});

describe('validateSubdomain', () => {
  it('returns early if subdomain undefined', () => {
    validateSubdomain(undefined);
    // no assertions needed, just ensure no crash
  });
});

describe('validateNetwork', () => {
  it('returns early if network undefined', () => {
    validateNetwork(undefined);
    // no assertions needed, just ensure no crash
  });
});
