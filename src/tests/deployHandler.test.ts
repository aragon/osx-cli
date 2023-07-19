import { beforeEach, beforeAll, describe, expect, it, vi } from 'vitest';
import * as keys from '../lib/keys';
import * as file from '../lib/file';
import * as prompts from '../lib/prompts.js';
import * as web3 from '../lib/web3';
import * as constants from '../lib/constants';

import { Network } from 'src/types/index';
import TestSetup from '../tests/mocks/TestSetup.json';
import { deployHandler } from '~/commands/deploy/deployHandler';

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

  it('should successfully deploy the contract to mumbai network', async () => {
    vi.spyOn(constants, 'exitWithMessage').mockImplementation((message: string) => {
      console.info(message);
      return;
    });

    vi.spyOn(web3, 'findNetworkByName').mockReturnValue(mockNetwork);
    vi.spyOn(keys, 'getPrivateKey').mockResolvedValue(privateKey);
    vi.spyOn(keys, 'getTenderlySettings').mockResolvedValue(tenderlySettings);
    vi.spyOn(file, 'findContractsBuildDirectory').mockReturnValue(buildPath);
    vi.spyOn(file, 'findContractBuild').mockReturnValue(TestSetup);
    vi.spyOn(prompts, 'confirmPrompt').mockResolvedValue(true);

    await deployHandler('contract', { network: 'network', simulate: true });

    expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/🧪 Simulation:/));
    expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/deployed to/));
  });

  it('should handle deployment failure correctly', async () => {
    const errorMessage = constants.strings.DEPLOYMENT_FAILED;

    vi.spyOn(constants, 'exitWithMessage').mockImplementation((message: string) => {
      console.error(message);
      return;
    });

    vi.spyOn(web3, 'findNetworkByName').mockReturnValue(mockNetwork);
    vi.spyOn(keys, 'getPrivateKey').mockResolvedValue(privateKey);
    vi.spyOn(keys, 'getTenderlySettings').mockResolvedValue(tenderlySettings);
    vi.spyOn(file, 'findContractsBuildDirectory').mockReturnValue(buildPath);
    vi.spyOn(file, 'findContractBuild').mockReturnValue(TestSetup);
    vi.spyOn(prompts, 'confirmPrompt').mockResolvedValue(true);
    vi.spyOn(web3, 'deployContract').mockRejectedValue(new Error(errorMessage));

    await deployHandler('contract', { network: 'network', simulate: true });
    expect(constants.exitWithMessage).toHaveBeenCalledWith(errorMessage);
  });
});
