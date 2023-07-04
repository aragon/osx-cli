import { exitWithMessage, logs, prompts, success } from '~/lib/constants';
import { ContractArtifact, Network } from '../../types';
import { findContractBuild, findContractsBuildDirectory } from '~/lib/file';
import {
  buildFolderPrompt,
  confirmPrompt,
  contractNamePrompt,
  networkSelectionPrompt,
} from '~/lib/prompts';
import { getPrivateKey } from '~/lib/keys';
import {
  deployContract,
  findNetworkByName,
  simulateDeployment,
} from '~/lib/web3';

export const deployHandler: (...args: any[]) => void | Promise<void> = async (
  contract?: string,
  options: { buildPath?: string; network?: string; simulate?: boolean } = {},
) => {
  const { network } = options;
  let { buildPath, simulate } = options;
  let chosenNetwork: Network;

  // Check private key is available
  if (!(await getPrivateKey())) exitWithMessage(logs.PRIVATE_KEY_NOT_FOUND);

  // Find build path
  buildPath = buildPath ?? findContractsBuildDirectory(process.cwd());
  if (!buildPath) await buildFolderPrompt();

  // Find contract
  contract = contract ?? (await contractNamePrompt());
  const contractBuild = findContractBuild(contract) as ContractArtifact;
  if (!contractBuild) exitWithMessage(logs.CONTRACT_BUILD_NOT_FOUND(contract));

  // Select network
  if (network) {
    chosenNetwork = findNetworkByName(network);
  } else {
    chosenNetwork = await networkSelectionPrompt();
  }

  // Display info
  console.table({ contract, buildPath, network: chosenNetwork.name });

  // Simulate deployment
  simulate = simulate ?? (await confirmPrompt(prompts.SIMULATE_DEPLOYMENT));
  if (simulate) await simulateDeployment(contractBuild, chosenNetwork.id);

  // Deploy
  if (!(await confirmPrompt('Proceed?'))) exitWithMessage('Aborted.');
  const { address, txHash } = await deployContract(
    chosenNetwork.url,
    contractBuild,
  );

  console.log(
    `\n\n🎉 ${contract}.sol: deployed to ${address} on ${chosenNetwork.name}`,
  );
  console.log(success(`🔗 ${chosenNetwork.explorer}/tx/${txHash}`));
};
