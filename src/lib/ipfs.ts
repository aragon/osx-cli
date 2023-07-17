import { BytesLike, ethers } from 'ethers';
import { Web3Storage, File } from 'web3.storage';
import { Buffer } from 'buffer';
import { updateSpinnerText, spinnerSuccess } from './spinners';

export async function uploadToIPFS(text: string): Promise<string> {
  const client = new Web3Storage({
    token: (import.meta as any).env?.VITE_WEB_3_STORAGE_KEY,
  });
  const textBuffer = Buffer.from(text);
  const file = new File([textBuffer], '');

  return await client.put([file], { wrapWithDirectory: false });
}

export function toHex(input: string): BytesLike {
  return ethers.utils.hexlify(ethers.utils.toUtf8Bytes(input));
}

export async function uploadMetadata(build: any, type: string): Promise<string> {
  updateSpinnerText(`Uploading ${type} Metadata...`);
  const cid = await uploadToIPFS(JSON.stringify(build, null, 2));
  spinnerSuccess(`${type} Metadata: https://ipfs.io/ipfs/${cid}`);
  return cid;
}
