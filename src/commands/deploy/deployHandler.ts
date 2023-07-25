import { exitWithMessage, logTable, strings } from '~/lib/constants';
import { ContractArtifact, Network } from '../../types';
import { findContractBuild, findContractsBuildDirectory } from '~/lib/file';
import { buildFolderPrompt, confirmPrompt, contractNamePrompt, networkSelectionPrompt } from '~/lib/prompts';
import { getPrivateKey, getTenderlySettings } from '~/lib/keys';
import { deployContract, findNetworkByName, simulateDeployment } from '~/lib/web3';
import { tenderlyKeyHandler } from '../settings/handlers/tenderlyKeyHandler';

export const deployHandler: (...args: any[]) => void | Promise<void> = async (
  contract?: string,
  options: { buildPath?: string; network?: string; simulate?: boolean } = {},
) => {
  try {
    const { network } = options;
    let { buildPath, simulate } = options;
    let chosenNetwork: Network;

    // Check private key is available
    if (!(await getPrivateKey())) exitWithMessage(strings.PRIVATE_KEY_NOT_FOUND);

    // Find build path
    buildPath = buildPath ?? findContractsBuildDirectory(process.cwd());
    if (!buildPath) await buildFolderPrompt();

    // Find contract
    contract = contract ?? (await contractNamePrompt());
    const contractBuild = findContractBuild(contract) as ContractArtifact;

    if (!contractBuild) exitWithMessage(strings.CONTRACT_BUILD_NOT_FOUND(contract));

    // Select network
    if (network) {
      chosenNetwork = findNetworkByName(network);
    } else {
      chosenNetwork = await networkSelectionPrompt();
    }

    // Display info
    logTable([{ contract }, { chain: chosenNetwork.name }]);

    // Simulate deployment
    simulate = simulate ?? (await confirmPrompt(strings.SIMULATE_DEPLOYMENT));
    if (simulate) {
      (await getTenderlySettings()) ?? (await tenderlyKeyHandler());
      await simulateDeployment(contractBuild, chosenNetwork.id);
    }

    // Deploy
    if (!(await confirmPrompt(strings.PROCEED_WITH_DEPLOYMENT))) exitWithMessage(strings.ABORTED);
    const { address, txHash } = await deployContract(chosenNetwork.url, contractBuild);

    console.log(strings.DEPLOYED(contract, address, chosenNetwork.name));
    console.log(strings.EXPLORER(chosenNetwork.explorer, txHash));
  } catch (error) {
    console.error(error);
    exitWithMessage(strings.DEPLOYMENT_FAILED);
  }
};
