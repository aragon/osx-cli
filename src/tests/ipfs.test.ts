import { describe, expect, it } from 'vitest';
import { uploadToIPFS, toHex } from '../lib/ipfs';

describe('uploadToIPFS', () => {
  it('should upload text to IPFS', async () => {
    const mockText = 'Code is Law!';
    const mockCID = 'bafkreiavjuq7hmb5vtamnalryqqctvvuyziq5rfsanow3qfypibcgf37pu';

    const cid = await uploadToIPFS(mockText);
    expect(cid).toEqual(mockCID);
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
