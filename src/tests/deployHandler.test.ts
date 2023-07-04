import { beforeEach, beforeAll, describe, expect, it, vi } from 'vitest';
import * as keys from '../lib/keys.js';
import * as file from '../lib/file.js';
import * as prompts from '../lib/prompts.js';
import * as web3 from '../lib/web3.js';
import * as constants from '../lib/constants.js';

import { Network } from 'src/types/index.js';
import TestSetup from '../tests/mocks/TestSetup.json';
import { deployHandler } from '~/commands/deploy/deployHandler.js';

import { config } from 'dotenv';
config();

describe('deployHandler', () => {
  const mockNetwork: Network = {
    name: 'mumbai',
    id: '80001',
    url: 'https://rpc.ankr.com/polygon_mumbai',
    explorer: 'https://mumbai.polygonscan.com',
  };

  const privateKey = process.env.PRIVATE_KEY as string;

  const tenderlySettings = {
    tenderlyProject: process.env.TENDERLY_PROJECT as string,
    tenderlyUsername: process.env.TENDERLY_USERNAME as string,
    tenderlyKey: process.env.TENDERLY_KEY as string,
  };

  const buildPath = 'src/tests/mocks/TestSetup.json';

  beforeAll(() => {
    console.log = vi.fn(); // suppress console.log
    console.error = vi.fn(); // suppress console.error
    console.table = vi.fn(); // suppress console.table
  });

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should successfully deploy the contract', async () => {
    vi.spyOn(constants, 'exitWithMessage').mockImplementation(
      (message: string) => {
        console.info(message);
        return;
      },
    );

    vi.spyOn(web3, 'findNetworkByName').mockReturnValue(mockNetwork);
    vi.spyOn(keys, 'getPrivateKey').mockResolvedValue(privateKey);
    vi.spyOn(keys, 'getTenderlySettings').mockResolvedValue(tenderlySettings);
    vi.spyOn(file, 'findContractsBuildDirectory').mockReturnValue(buildPath);
    vi.spyOn(file, 'findContractBuild').mockReturnValue(TestSetup);
    vi.spyOn(prompts, 'confirmPrompt').mockResolvedValue(true);

    await deployHandler('contract', { network: 'network', simulate: true });

    expect(console.log).toHaveBeenCalledWith(
      expect.stringMatching(/🧪 Simulation:/),
    );
    expect(console.log).toHaveBeenCalledWith(
      expect.stringMatching(/deployed to/),
    );
  });
});
