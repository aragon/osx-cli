import {
  setPrivateKey,
  setTenderlyKey,
  getPrivateKey,
  getTenderlyKey,
} from './keys';
import keytar from 'keytar';
import {
  beforeEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
  SpyInstance,
} from 'vitest';

vi.mock('keytar');

describe('Key management tests', () => {
  let setPasswordSpy: SpyInstance;
  let getPasswordSpy: SpyInstance;
  let consoleErrorSpy: SpyInstance;

  beforeAll(() => {
    console.log = vi.fn(); // suppress console.log
    console.error = vi.fn(); // suppress console.error
  });

  beforeEach(() => {
    setPasswordSpy = vi.spyOn(keytar, 'setPassword');
    getPasswordSpy = vi.spyOn(keytar, 'getPassword');
    consoleErrorSpy = vi.spyOn(console, 'error');
  });

  it('should store the private key successfully', async () => {
    const privateKey = 'a'.repeat(64); // 64 hexadecimal characters
    setPasswordSpy.mockResolvedValue(undefined);

    await setPrivateKey(privateKey);

    expect(setPasswordSpy).toHaveBeenCalledWith(
      'aragon-cli',
      'private-key',
      privateKey,
    );
  });

  it('should not store an invalid private key', async () => {
    const privateKey = 'invalidPrivateKey';

    await setPrivateKey(privateKey);

    expect(setPasswordSpy).not.toHaveBeenCalled();
  });

  it('should store the Tenderly key successfully', async () => {
    const tenderlyKey = 'aBc123'.padEnd(32, '0'); // 32 alphanumeric characters
    setPasswordSpy.mockResolvedValue(undefined);

    await setTenderlyKey(tenderlyKey);

    expect(setPasswordSpy).toHaveBeenCalledWith(
      'aragon-cli',
      'tenderly-key',
      tenderlyKey,
    );
  });

  it('should not store an invalid Tenderly key', async () => {
    const tenderlyKey = 'invalidTenderlyKey';

    await setTenderlyKey(tenderlyKey);

    expect(setPasswordSpy).not.toHaveBeenCalled();
  });

  it('should retrieve the private key', async () => {
    const privateKey = 'a'.repeat(64);
    getPasswordSpy.mockResolvedValue(privateKey);

    const result = await getPrivateKey();

    expect(result).toBe(privateKey);
    expect(getPasswordSpy).toHaveBeenCalledWith('aragon-cli', 'private-key');
  });

  it('should retrieve the Tenderly key', async () => {
    const tenderlyKey = 'aBc123'.padEnd(32, '0');
    getPasswordSpy.mockResolvedValue(tenderlyKey);

    const result = await getTenderlyKey();

    expect(result).toBe(tenderlyKey);
    expect(getPasswordSpy).toHaveBeenCalledWith('aragon-cli', 'tenderly-key');
  });

  it('should log Zod error for invalid private key', async () => {
    const privateKey = 'invalidPrivateKey';
    await setPrivateKey(privateKey);
    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(setPasswordSpy).not.toHaveBeenCalled();
  });

  it('should log Zod error for invalid Tenderly key', async () => {
    const tenderlyKey = 'invalidTenderlyKey';
    await setTenderlyKey(tenderlyKey);
    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(setPasswordSpy).not.toHaveBeenCalled();
  });

  it('should log error if setPrivateKey fails for other reason', async () => {
    const privateKey = 'a'.repeat(64);
    setPasswordSpy.mockRejectedValue(new Error('failed'));
    await setPrivateKey(privateKey);
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it('should log error if setTenderlyKey fails for other reason', async () => {
    const tenderlyKey = 'aBc123'.padEnd(32, '0');
    setPasswordSpy.mockRejectedValue(new Error('failed'));
    await setTenderlyKey(tenderlyKey);
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it('should handle null return from getPassword for private key', async () => {
    getPasswordSpy.mockResolvedValue(null);
    const result = await getPrivateKey();
    expect(result).toBeNull();
  });

  it('should handle null return from getPassword for Tenderly key', async () => {
    getPasswordSpy.mockResolvedValue(null);
    const result = await getTenderlyKey();
    expect(result).toBeNull();
  });
});
