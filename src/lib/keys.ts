import keytar from 'keytar';
import chalk from 'chalk';
import { z } from 'zod';

const service = 'aragon-cli';
const accountPrivateKey = 'private-key';
const accountTenderlyKey = 'tenderly-key';

// Define the schema for the private key
export const privateKeySchema = z
  .string()
  .length(64, 'Private key must be exactly 64 characters long.')
  .regex(
    /^[a-fA-F0-9]*$/,
    'Private key must only contain hexadecimal characters.',
  );

// Define the schema for the Tenderly key
export const tenderlyKeySchema = z
  .string()
  .length(32, 'Tenderly key must be exactly 32 characters long.')
  .regex(
    /^[a-zA-Z0-9]*$/,
    'Tenderly key must only contain numbers and letters.',
  );

export const setPrivateKey = async (privateKey: string): Promise<void> => {
  try {
    privateKeySchema.parse(privateKey);
    await keytar.setPassword(service, accountPrivateKey, privateKey);
    console.log(chalk.green('Private Key stored successfully.'));
  } catch (error) {
    error instanceof z.ZodError
      ? console.error('Invalid input:', error.errors)
      : console.error('Failed to set private key:', error);
  }
};

export const setTenderlyKey = async (tenderlyKey: string): Promise<void> => {
  try {
    tenderlyKeySchema.parse(tenderlyKey);
    await keytar.setPassword(service, accountTenderlyKey, tenderlyKey);
    console.log(chalk.green('Tenderly Key stored successfully.'));
  } catch (error) {
    error instanceof z.ZodError
      ? console.error('Invalid input:', error.errors)
      : console.error('Failed to set Tenderly key:', error);
  }
};

export const getPrivateKey = async (): Promise<string | null> => {
  return keytar.getPassword(service, accountPrivateKey);
};

export const getTenderlyKey = async (): Promise<string | null> => {
  return keytar.getPassword(service, accountTenderlyKey);
};
