import { BytesLike, ethers } from 'ethers';
import { updateSpinnerText, spinnerSuccess, spinnerError } from './spinners';
import { exitWithMessage, strings } from './strings';
import { IpfsUri, ipfsUriSchema } from './schemas';
import { client } from './sdk';
import { resolveIpfsCid } from '@aragon/sdk-client-common';

import dotenv from 'dotenv';
dotenv.config();

/**
 * This function is used to upload a string of text to IPFS through Web3Storage.
 * @async
 * @param {string} text - The text to upload to IPFS.
 * @returns {Promise<string>} A promise that resolves to the CID of the uploaded text if successful, otherwise an error message.
 * @throws {Error} If there's any error in the upload process, it throws an error.
 */
export async function uploadToIPFS(text: string): Promise<string> {
  try {
    const aragon = await client('mainnet');
    const hash = await aragon.ipfs.add(text);
    console.log(hash);
    return hash;
  } catch (error) {
    console.error(error);
    exitWithMessage(strings.IPFS_UPLOAD_ERROR);
    throw error;
  }
}

/**
 * This function is used to download a file from IPFS through Web3Storage.
 * @async
 * @param {IpfsUri} uri - The CID of the file to download from IPFS.
 * @returns {Promise<any>} A promise that resolves to a JSON object or null.
 * @throws {Error} If there's any error in the download process, it throws an error.
 */
export async function downloadFromIPFS(uri: IpfsUri): Promise<any> {
  const validationResult = ipfsUriSchema.safeParse(uri);
  if (!validationResult.success) {
    return null;
  }

  try {
    updateSpinnerText(strings.DOWNLOADING_METADATA);
    const aragon = await client('mainnet');
    const cid = resolveIpfsCid(uri);
    const stringMetadata = await aragon.ipfs.fetchString(cid);
    const resolvedMetadata = JSON.parse(stringMetadata);
    spinnerSuccess(strings.METADATA_DOWNLOADED);
    return JSON.parse(resolvedMetadata);
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error(strings.IPFS_NOT_VALID_JSON);
    } else {
      // console.error(error);
    }
    spinnerError("Couldn't download metadata from IPFS");
    return null;
  }
}

/**
 * This function is used to convert a string into hexadecimal format.
 * @param {string} input - The input string to be converted.
 * @returns {BytesLike} The hexadecimal representation of the input string.
 */
export function toHex(input: string): BytesLike {
  return ethers.utils.hexlify(ethers.utils.toUtf8Bytes(input));
}

/**
 * This function is used to upload metadata to IPFS and show the status of the operation.
 * @async
 * @param {any} build - The object to be converted to a JSON string and uploaded.
 * @param {string} type - A string indicating the type of data being uploaded, used for updating the spinner text.
 * @returns {Promise<string>} A promise that resolves to the CID of the uploaded text if successful.
 * @throws {Error} If there's any error in the upload process, it throws an error.
 */
export async function uploadMetadata(build: any, type: string): Promise<string> {
  if (!build) return '0x00';
  updateSpinnerText(`Uploading ${type} Metadata...`);
  const cid = await uploadToIPFS(JSON.stringify(build, null, 2));
  spinnerSuccess(`${type} Metadata: https://ipfs.io/ipfs/${cid}`);
  return cid;
}
