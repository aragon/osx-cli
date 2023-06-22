import { exitWithMessage, logs } from '~/lib/constants';
import { ContractArtifact, Networks } from '../../types';
import { findContractBuild, findContractsBuildDirectory } from '~/lib/file';
import {
  buildFolderPrompt,
  confirmPrompt,
  contractNamePrompt,
  networkSelectionPrompt,
} from '~/lib/prompts';
import { getPrivateKey } from '~/lib/keys';
import { ethers } from 'ethers';
import { getWallet } from '~/lib/wallet';

export const deployHandler: (...args: any[]) => void | Promise<void> = async (
  contract?: string,
  options: { buildPath?: string; network?: Networks; simulate?: boolean } = {},
) => {
  let { buildPath, network, simulate } = options;

  // Find build path
  buildPath = buildPath ?? findContractsBuildDirectory(process.cwd());
  if (!buildPath) await buildFolderPrompt();

  // Find contract
  contract = contract ?? (await contractNamePrompt());
  const contractBuild = findContractBuild(contract) as ContractArtifact;
  if (!contractBuild) exitWithMessage(logs.CONTRACT_BUILD_NOT_FOUND(contract));

  // Select network
  network = network ?? (await networkSelectionPrompt());
  simulate = simulate ?? (await confirmPrompt(logs.SIMULATE_DEPLOYMENT));

  // Deploy
  const privateKey = await getPrivateKey();
  if (!privateKey) exitWithMessage(logs.PRIVATE_KEY_NOT_FOUND);

  console.log({ contract, buildPath, network, simulate, privateKey });

  const wallet = await getWallet();
  const provider = new ethers.JsonRpcProvider(network);

  const pluginSetup = new ethers.ContractFactory(
    contractBuild.abi,
    contractBuild.bytecode,
    wallet?.connect(provider),
  );

  const contractInstance = await pluginSetup.deploy();
  console.log(contractInstance);
  console.log(await contractInstance.getAddress());
};
