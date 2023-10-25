import { TenderlySettings } from 'src/types';
import { beforeEach, beforeAll, describe, expect, it, vi, SpyInstance } from 'vitest';
import {
  setPrivateKey,
  setTenderlySettings,
  getPrivateKey,
  getTenderlySettings,
  readConfig,
} from '~/lib/keys';
import fs from 'fs';
import { configFilePath } from '~/lib/file';
import path from 'path';

describe('Key management tests', () => {
  let consoleErrorSpy: SpyInstance;

  beforeAll(() => {
    console.log = vi.fn(); // suppress console.log
    console.error = vi.fn(); // suppress console.error
  });

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error');
    // Ensure the config directory exists and reset the config file before each test
    fs.mkdirSync(path.dirname(configFilePath), { recursive: true });
    // Reset the config file before each test
    fs.writeFileSync(configFilePath, JSON.stringify({}));
  });

  it('should store the private key successfully', async () => {
    const privateKey = 'a'.repeat(64); // 64 hexadecimal characters

    await setPrivateKey(privateKey);

    const config = readConfig();
    expect(config.privateKey).toBe(privateKey);
  });

  it('should not store an invalid private key', async () => {
    const privateKey = 'invalidPrivateKey';

    await setPrivateKey(privateKey);

    const config = readConfig();
    expect(config.privateKey).toBeUndefined();
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it('should store the Tenderly settings successfully', async () => {
    const tenderlySettings: TenderlySettings = {
      tenderlyKey: 'aBc123'.padEnd(32, '0'), // 32 alphanumeric characters
      tenderlyProject: 'alice-project',
      tenderlyUsername: 'alice',
    };

    await setTenderlySettings(tenderlySettings);

    const config = readConfig();
    expect(config.tenderlyKey).toBe(tenderlySettings.tenderlyKey);
    expect(config.tenderlyProject).toBe(tenderlySettings.tenderlyProject);
    expect(config.tenderlyUsername).toBe(tenderlySettings.tenderlyUsername);
  });

  it('should not store an invalid Tenderly key', async () => {
    const tenderlySettings: TenderlySettings = {
      tenderlyKey: 'invalidTenderlyKey',
      tenderlyProject: 'alice-project',
      tenderlyUsername: 'alice',
    };

    await setTenderlySettings(tenderlySettings);

    const config = readConfig();
    expect(config.tenderlyKey).toBeUndefined();
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it('should retrieve the private key', async () => {
    const privateKey = 'a'.repeat(64);
    fs.writeFileSync(configFilePath, JSON.stringify({ privateKey }));

    const result = await getPrivateKey();

    expect(result).toBe(privateKey);
  });

  it('should retrieve the Tenderly settings', async () => {
    const tenderlySettings: TenderlySettings = {
      tenderlyKey: 'aBc123'.padEnd(32, '0'), // 32 alphanumeric characters
      tenderlyProject: 'alice-project',
      tenderlyUsername: 'alice',
    };
    fs.writeFileSync(configFilePath, JSON.stringify(tenderlySettings));

    const result = await getTenderlySettings();

    expect(result).toEqual(tenderlySettings);
  });

  it('should handle null return from getPrivateKey', async () => {
    const result = await getPrivateKey();
    expect(result).toBeNull();
  });

  it('should handle null return from getTenderlySettings', async () => {
    const result = await getTenderlySettings();
    expect(result).toBeNull();
  });
});
