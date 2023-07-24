import { BytesLike, ethers } from 'ethers';
import { Web3Storage, File } from 'web3.storage';
import { Buffer } from 'buffer';
import { updateSpinnerText, spinnerSuccess } from './spinners';
import { WEB_3_STORAGE, exitWithMessage, strings } from './constants';

/**
 * This function is used to upload a string of text to IPFS through Web3Storage.
 * @async
 * @param {string} text - The text to upload to IPFS.
 * @returns {Promise<string>} A promise that resolves to the CID of the uploaded text if successful, otherwise an error message.
 * @throws {Error} If there's any error in the upload process, it throws an error.
 */
export async function uploadToIPFS(text: string): Promise<string> {
  try {
    const client = new Web3Storage({ token: WEB_3_STORAGE });
    const textBuffer = Buffer.from(text);
    const file = new File([textBuffer], '');

    return await client.put([file], { wrapWithDirectory: false });
  } catch (error) {
    console.error(error);
    exitWithMessage(strings.IPFS_UPLOAD_ERROR);
    throw error;
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
  updateSpinnerText(`Uploading ${type} Metadata...`);
  const cid = await uploadToIPFS(JSON.stringify(build, null, 2));
  spinnerSuccess(`${type} Metadata: https://ipfs.io/ipfs/${cid}`);
  return cid;
}
