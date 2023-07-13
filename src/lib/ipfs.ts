import {BytesLike, ethers} from 'ethers';
import {Web3Storage, File} from 'web3.storage';
import {Buffer} from 'buffer';

const accessToken = '';

export async function uploadToIPFS(text: string): Promise<string> {


  // if (!accessToken) {
  //   throw new Error('WEB_3_STORAGE_KEY environment variable not set');
  // }
  const client = new Web3Storage({token: accessToken});
  const textBuffer = Buffer.from(text);
  const file = new File([textBuffer], '');

  return await client.put([file], {wrapWithDirectory: false});
}

export function toHex(input: string): BytesLike {
  return ethers.utils.hexlify(ethers.utils.toUtf8Bytes(input));
}