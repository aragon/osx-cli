import {
  setPrivateKey,
  setTenderlySettings,
  getPrivateKey,
  getTenderlySettings,
} from './keys';
import keytar from 'keytar';
import { TenderlySettings } from 'src/types';
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

  it('should store the Tenderly settings successfully', async () => {
    const tenderlySettings: TenderlySettings = {
      tenderlyKey: 'aBc123'.padEnd(32, '0'), // 32 alphanumeric characters
      tenderlyProject: 'alice-project',
      tenderlyUsername: 'alice',
    };
    const { tenderlyKey, tenderlyProject, tenderlyUsername } = tenderlySettings;

    setPasswordSpy.mockResolvedValue(undefined);

    await setTenderlySettings(tenderlySettings);

    expect(setPasswordSpy).toHaveBeenCalledWith(
      'aragon-cli',
      'tenderly-key',
      tenderlyKey,
    );

    expect(setPasswordSpy).toHaveBeenCalledWith(
      'aragon-cli',
      'tenderly-project',
      tenderlyProject,
    );

    expect(setPasswordSpy).toHaveBeenCalledWith(
      'aragon-cli',
      'tenderly-username',
      tenderlyUsername,
    );
  });

  it('should not store an invalid Tenderly key', async () => {
    const tenderlyKey: TenderlySettings = {
      tenderlyKey: 'invalidTenderlyKey',
      tenderlyProject: 'alice-project',
      tenderlyUsername: 'alice',
    };

    await setTenderlySettings(tenderlyKey);

    expect(setPasswordSpy).not.toHaveBeenCalled();
  });

  it('should retrieve the private key', async () => {
    const privateKey = 'a'.repeat(64);
    getPasswordSpy.mockResolvedValue(privateKey);

    const result = await getPrivateKey();

    expect(result).toBe(privateKey);
    expect(getPasswordSpy).toHaveBeenCalledWith('aragon-cli', 'private-key');
  });

  // it('should retrieve the Tenderly settings', async () => {
  //   const tenderlyKey: TenderlySettings = {
  //     tenderlyKey: 'aBc123'.padEnd(32, '0'), // 32 alphanumeric characters
  //     tenderlyProject: 'alice-project',
  //     tenderlyUsername: 'alice',
  //   };
  //   getPasswordSpy.mockResolvedValue(tenderlyKey);

  //   const result = await getTenderlySettings();

  //   expect(result).toBe(tenderlyKey);
  //   expect(getPasswordSpy).toHaveBeenCalledWith('aragon-cli', 'tenderly-key');
  // });

  it('should retrieve the Tenderly settings', async () => {
    const tenderlySettings: TenderlySettings = {
      tenderlyKey: 'aBc123'.padEnd(32, '0'), // 32 alphanumeric characters
      tenderlyProject: 'alice-project',
      tenderlyUsername: 'alice',
    };

    getPasswordSpy.mockImplementation((service, account) => {
      switch (account) {
        case 'tenderly-key':
          return Promise.resolve(tenderlySettings.tenderlyKey);
        case 'tenderly-project':
          return Promise.resolve(tenderlySettings.tenderlyProject);
        case 'tenderly-username':
          return Promise.resolve(tenderlySettings.tenderlyUsername);
        default:
          return Promise.resolve(null);
      }
    });

    const result = await getTenderlySettings();

    expect(result).toEqual(tenderlySettings);
    expect(getPasswordSpy).toHaveBeenCalledWith('aragon-cli', 'tenderly-key');
    expect(getPasswordSpy).toHaveBeenCalledWith(
      'aragon-cli',
      'tenderly-project',
    );
    expect(getPasswordSpy).toHaveBeenCalledWith(
      'aragon-cli',
      'tenderly-username',
    );
  });

  it('should log Zod error for invalid private key', async () => {
    const privateKey = 'invalidPrivateKey';
    await setPrivateKey(privateKey);
    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(setPasswordSpy).not.toHaveBeenCalled();
  });

  it('should log Zod error for invalid Tenderly key', async () => {
    const tenderlyKey: TenderlySettings = {
      tenderlyKey: 'invalidTenderlyKey',
      tenderlyProject: 'alice-project',
      tenderlyUsername: 'alice',
    };
    await setTenderlySettings(tenderlyKey);
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
    const tenderlyKey: TenderlySettings = {
      tenderlyKey: 'invalidTenderlyKey',
      tenderlyProject: 'alice-project',
      tenderlyUsername: 'alice',
    };
    setPasswordSpy.mockRejectedValue(new Error('failed'));
    await setTenderlySettings(tenderlyKey);
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it('should handle null return from getPassword for private key', async () => {
    getPasswordSpy.mockResolvedValue(null);
    const result = await getPrivateKey();
    expect(result).toBeNull();
  });

  it('should handle null return from getPassword for Tenderly key', async () => {
    getPasswordSpy.mockResolvedValue(null);
    const result = await getTenderlySettings();
    expect(result).toBeNull();
  });
});
