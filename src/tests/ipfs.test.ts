import { describe, expect, it, vi, beforeAll } from 'vitest';
import { uploadToIPFS, toHex } from '../lib/ipfs';
import * as ipfs from '../lib/ipfs';
import { strings } from '~/lib/strings';

describe('uploadToIPFS', () => {
  beforeAll(() => {
    process.exit = vi.fn();
  });

  // TODO: This is temporarily disabled because it's not working in the CI environment.

  // it('should upload text to IPFS', async () => {
  //   const mockText = { msg: 'Code is Law!' };
  //   const mockCID = 'QmcaffahPqaejjEQUFJQVGA6H86GPa6cgjddKJiAWRgtJT';
  //   console.log('mockCID', mockCID);
  //   const cid = await uploadToIPFS(JSON.stringify(mockText, null, 2));
  //   console.log('cid', cid);
  //   expect(cid).toEqual(mockCID);
  // });

  it('should throw an error if there is an issue with uploading', async () => {
    const mockText = 'Code is Law!';

    vi.spyOn(ipfs, 'uploadToIPFS').mockImplementation(() => {
      return new Promise<string>((_, reject) => {
        reject(new Error(strings.IPFS_UPLOAD_ERROR));
      });
    });
    // Expect the function to reject with an error
    await expect(uploadToIPFS(mockText)).rejects.toThrow(strings.IPFS_UPLOAD_ERROR);
  });
});

describe('toHex', () => {
  it('should convert a string to hex', () => {
    const input = 'Law is Code!';
    const expected = '0x4c617720697320436f646521';
    const hex = toHex(input);

    expect(hex).toEqual(expected);
  });
});
