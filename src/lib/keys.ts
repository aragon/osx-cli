import chalk from 'chalk';
import { z } from 'zod';
import { privateKeySchema, tenderlyKeySchema } from './schemas';
import { TenderlySettings } from 'src/types';
import fs from 'fs';
import { configFilePath } from './file';

/**
 * Reads the configuration from the config file.
 *
 * @returns {object} The configuration object. If the file doesn't exist or can't be read for any reason, it returns an empty object.
 * @throws Will throw an error if the file can't be read due to reasons other than non-existence.
 */
export const readConfig = (): any => {
  try {
    const data = fs.readFileSync(configFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
};

/**
 * Writes the given configuration data to the config file.
 *
 * @param {object} data - The configuration data to write.
 * @throws Will throw an error if the file can't be written.
 */
export const writeConfig = (data: any): void => {
  fs.writeFileSync(configFilePath, JSON.stringify(data, null, 2));
};

/**
 * Stores the private key in a secure location after validating it.
 *
 * @param {string} privateKey - The private key to be stored.
 * @returns {Promise<void>} A Promise that resolves when the operation completes.
 * @throws Will throw an error if the private key does not conform to the schema or if the storage operation fails.
 */
export const setPrivateKey = async (privateKey: string): Promise<void> => {
  try {
    privateKeySchema.parse(privateKey);
    const config = readConfig();
    config.privateKey = privateKey;
    writeConfig(config);
    console.log(chalk.green('Private Key stored successfully.'));
  } catch (error) {
    error instanceof z.ZodError
      ? console.error('Invalid input:', error.errors)
      : console.error('Failed to set private key:', error);
  }
};

/**
 * Sets the Tenderly settings and stores them in a secure location.
 *
 * @param {TenderlySettings} tenderlySettings - The Tenderly settings to be stored.
 * @returns {Promise<void>} A Promise that resolves when the operation completes.
 * @throws Will throw an error if the Tenderly settings do not conform to the schema or if the storage operation fails.
 */
export const setTenderlySettings = async (tenderlySettings: TenderlySettings): Promise<void> => {
  const { tenderlyKey, tenderlyProject, tenderlyUsername } = tenderlySettings;
  try {
    tenderlyKeySchema.parse(tenderlyKey);
    const config = readConfig();
    config.tenderlyKey = tenderlyKey;
    config.tenderlyProject = tenderlyProject;
    config.tenderlyUsername = tenderlyUsername;
    writeConfig(config);
    console.log(chalk.green('Tenderly settings stored successfully.'));
  } catch (error) {
    error instanceof z.ZodError
      ? console.error('Invalid input:', error.errors)
      : console.error('Failed to set Tenderly key:', error);
  }
};

/**
 * Retrieves the private key from storage.
 *
 * @returns {Promise<string | null>} A promise that resolves to the private key string or null if not found.
 */
export const getPrivateKey = async (): Promise<string | null> => {
  const config = readConfig();
  return config.privateKey || null;
};

/**
 * Retrieves the tenderly settings from storage.
 *
 * @returns {Promise<TenderlySettings | null>} A promise that resolves to an object containing tenderly settings (key, project, and username) or null if any of them is missing.
 * @throws Will throw an error if there was an issue retrieving the keys.
 */
export const getTenderlySettings = async (): Promise<TenderlySettings | null> => {
  try {
    const config = readConfig();
    const { tenderlyKey, tenderlyProject, tenderlyUsername } = config;
    if (!tenderlyKey || !tenderlyProject || !tenderlyUsername) return null;
    return { tenderlyKey, tenderlyProject, tenderlyUsername };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// const getKey = async (key: string) => {
//   return keytar.getPassword(service, key);
// };

// const setKey = async (key: string, value: string) => {
//   return keytar.setPassword(service, key, value);
// };
