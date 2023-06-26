import { exitWithMessage, logs, networks, success } from '~/lib/constants';
import { ContractArtifact, Network } from '../../types';
import { findContractBuild, findContractsBuildDirectory } from '~/lib/file';
import {
  buildFolderPrompt,
  confirmPrompt,
  contractNamePrompt,
  networkSelectionPrompt,
} from '~/lib/prompts';
import { getPrivateKey } from '~/lib/keys';
import { deployContract } from '~/lib/web3';

export const deployHandler: (...args: any[]) => void | Promise<void> = async (
  contract?: string,
  options: { buildPath?: string; network?: string; simulate?: boolean } = {},
) => {
  const { network } = options;
  let { buildPath, simulate } = options;
  let chosenNetwork: Network;

  // Find build path
  buildPath = buildPath ?? findContractsBuildDirectory(process.cwd());
  if (!buildPath) await buildFolderPrompt();

  // Find contract
  contract = contract ?? (await contractNamePrompt());
  const contractBuild = findContractBuild(contract) as ContractArtifact;
  if (!contractBuild) exitWithMessage(logs.CONTRACT_BUILD_NOT_FOUND(contract));

  // Select network
  network
    ? (chosenNetwork = findNetworkByName(network))
    : (chosenNetwork = await networkSelectionPrompt());

  simulate = simulate ?? (await confirmPrompt(logs.SIMULATE_DEPLOYMENT));

  // Prepare to deploy
  const privateKey = await getPrivateKey();
  if (!privateKey) exitWithMessage(logs.PRIVATE_KEY_NOT_FOUND);

  // confirm
  console.table({ contract, buildPath, network: chosenNetwork.name, simulate });
  if (!(await confirmPrompt('Proceed?'))) exitWithMessage('Aborted.');

  const { address, txHash } = await deployContract(
    chosenNetwork.url,
    contractBuild,
  );

  console.log(`\n\n🎉 ${contract}.sol: deployed to ${address}`);
  console.log(success(`🔗 ${chosenNetwork.explorer}/tx/${txHash}`));
};

const findNetworkByName = (name: string): Network => {
  const network = networks.find((network) => network.name === name);

  if (!network) exitWithMessage(logs.NETWORK_NOT_FOUND(name));

  return network as Network;
};
