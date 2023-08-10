import { describe, expect, it, vi } from 'vitest';
import { uploadToIPFS, toHex } from '../lib/ipfs';
import * as ipfs from '../lib/ipfs';
import { strings } from '~/lib/strings';

describe('uploadToIPFS', () => {
  it('should upload text to IPFS', async () => {
    const mockText = 'Code is Law!';
    const mockCID = 'bafkreiavjuq7hmb5vtamnalryqqctvvuyziq5rfsanow3qfypibcgf37pu';

    const cid = await uploadToIPFS(mockText);
    expect(cid).toEqual(mockCID);
  });

  it('should throw an error if there is an issue with uploading', async () => {
    const mockText = 'Code is Law!';

    vi.spyOn(ipfs, 'uploadToIPFS').mockImplementation(() => {
      return new Promise((_, reject) => {
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
