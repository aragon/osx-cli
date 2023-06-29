import { Wallet, ethers } from 'ethers';
import { ContractArtifact, TenderlySettings } from 'src/types';
import { getWallet } from './wallet';
import {
  spinnerError,
  spinnerSuccess,
  stopSpinner,
  updateSpinnerText,
} from './spinners';
import axios from 'axios';
import { getTenderlySettings } from './keys';
import { exitWithMessage, warning } from './constants';

export const deployContract = async (
  rpc: string,
  contractBuild: ContractArtifact,
): Promise<{ address: string | undefined; txHash: string | undefined }> => {
  const wallet = await getWallet();
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  let address, txHash;
  const pluginSetup = new ethers.ContractFactory(
    contractBuild.abi,
    contractBuild.bytecode,
    wallet?.connect(provider),
  );

  try {
    updateSpinnerText('Deploying contract...');
    const instance = await pluginSetup.deploy();
    await instance.deployed();
    address = instance.address;
    txHash = instance.deployTransaction.hash;
    stopSpinner();
  } catch (error) {
    spinnerError('Failed to deploy contract');
    console.error(error);
    process.exit(1);
  }
  return { address, txHash };
};

export async function tenderlyFork(networkId = '1') {
  const { tenderlyKey, tenderlyUsername, tenderlyProject } =
    (await getTenderlySettings()) as TenderlySettings;

  // if any of the tenderly settings are missing, exit
  if (!tenderlyKey || !tenderlyUsername || !tenderlyProject)
    exitWithMessage('Tenderly settings not found');

  const fork = await axios.post(
    `https://api.tenderly.co/api/v1/account/${tenderlyUsername}/project/${tenderlyProject}/fork`,
    { network_id: networkId },
    { headers: { 'X-Access-Key': tenderlyKey as string } },
  );

  const forkId = fork.data.simulation_fork.id;
  const rpcUrl = `https://rpc.tenderly.co/fork/${forkId}`;
  const forkUrl = `https://dashboard.tenderly.co/${tenderlyUsername}/${tenderlyProject}/fork/${forkId}`;
  const forkProvider = new ethers.providers.JsonRpcProvider(rpcUrl);

  return { forkId, rpcUrl, forkUrl, forkProvider };
}

export const simulateDeployment = async (
  contractBuild: ContractArtifact,
  networkId: string,
) => {
  const { forkUrl, forkProvider } = await tenderlyFork(networkId);

  try {
    updateSpinnerText('Simulating deployment...');
    let wallet = await getWallet();
    wallet = wallet?.connect(forkProvider) as Wallet;

    const contract = new ethers.ContractFactory(
      contractBuild.abi,
      contractBuild.bytecode,
      wallet?.connect(forkProvider),
    );
    await contract.deploy();
    spinnerSuccess('Simulation complete');
    console.log(`\n🧪 Simulation: ${warning(forkUrl)}`);
  } catch (error) {
    const e = error as Error;
    console.error(e.message);
    spinnerError('Failed to simulate deployment');
    process.exit(1);
  }
};

export function bytesToHex(buff: Uint8Array, skip0x?: boolean): string {
  const bytes: string[] = [];
  for (let i = 0; i < buff.length; i++) {
    if (buff[i] >= 16) bytes.push(buff[i].toString(16));
    else bytes.push('0' + buff[i].toString(16));
  }
  if (skip0x) return bytes.join('');
  return '0x' + bytes.join('');
}
