import { beforeEach, beforeAll, describe, expect, it, vi } from 'vitest';
import * as strings from '~/lib/strings';

import { infoHandler } from '~/commands/info/infoHandler';

describe('infoHandler', () => {
  beforeAll(() => {
    console.log = vi.fn();
    console.error = vi.fn();
    console.table = vi.fn();
  });

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should log plugin information when a correct plugin is passed in', async () => {
    const pluginName = 'admin';
    const options = { network: 'mainnet' };

    await infoHandler(pluginName, options);

    expect(console.log).toHaveBeenCalledWith(
      expect.stringMatching(/0xa4371a239d08bfba6e8894eccf8466c6323a52c3/),
    );
  });

  it('should throw an error when a non-existent plugin is passed in', async () => {
    vi.spyOn(strings, 'exitWithMessage').mockImplementation((message: string) => {
      console.log(message);
      return;
    });

    const pluginName = 'non-existent-plugin';
    const options = { network: 'mainnet' };

    const errorMessage = strings.strings.CANNOT_FIND_REPO(pluginName);
    await infoHandler(pluginName, options);

    expect(console.log).toHaveBeenCalledWith(errorMessage);
  });
});
