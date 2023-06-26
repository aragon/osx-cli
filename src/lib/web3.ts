import { ethers } from 'ethers';
import { ContractArtifact } from 'src/types';
import { getWallet } from './wallet';
import { spinnerError, stopSpinner, updateSpinnerText } from './spinners';

export const deployContract = async (
  rpc: string,
  contractBuild: ContractArtifact,
): Promise<{ address: string | undefined; txHash: string | undefined }> => {
  const wallet = await getWallet();
  const provider = new ethers.JsonRpcProvider(rpc);
  let address, txHash;
  const pluginSetup = new ethers.ContractFactory(
    contractBuild.abi,
    contractBuild.bytecode,
    wallet?.connect(provider),
  );

  try {
    updateSpinnerText('Deploying contract...');
    const instance = await pluginSetup.deploy();
    address = await instance.getAddress();
    txHash = instance.deploymentTransaction()?.hash;
    stopSpinner();
  } catch (error) {
    spinnerError('Failed to deploy contract');
    console.error(error);
    process.exit(1);
  }
  return { address, txHash };
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
