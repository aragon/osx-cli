import { BytesLike, ethers } from 'ethers';
import { Web3Storage, File } from 'web3.storage';
import { Buffer } from 'buffer';
import { updateSpinnerText, spinnerSuccess } from './spinners';

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDU5MjFCRTY0ZDk1MkU5Y2FlNzQ1RURENEExY2FFRkEzOTJCNDdhNGYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjczNzczNDIxODUsIm5hbWUiOiJhcmFnb24ifQ.OMXTNr32vPvnccsW_3PrbQUaELUD7hQesJm0HiBapoE';

export async function uploadToIPFS(text: string): Promise<string> {
  const client = new Web3Storage({ token: accessToken });
  const textBuffer = Buffer.from(text);
  const file = new File([textBuffer], '');

  return await client.put([file], { wrapWithDirectory: false });
}

export function toHex(input: string): BytesLike {
  return ethers.utils.hexlify(ethers.utils.toUtf8Bytes(input));
}

export async function uploadMetadata(
  build: any,
  type: string,
): Promise<string> {
  updateSpinnerText(`Uploading ${type} Metadata...`);
  const cid = await uploadToIPFS(JSON.stringify(build, null, 2));
  spinnerSuccess(`${type} Metadata: https://ipfs.io/ipfs/${cid}`);
  return cid;
}
