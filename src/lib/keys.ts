import keytar from 'keytar';
import chalk from 'chalk';
import { z } from 'zod';
import { privateKeySchema, tenderlyKeySchema } from './schemas';
import { TenderlySettings } from 'src/types';

const service = 'aragon-cli';
const accountPrivateKey = 'private-key';
const accountTenderlyKey = 'tenderly-key';
const accountTenderlyProject = 'tenderly-project';
const accountTenderlyUsername = 'tenderly-username';

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

export const setTenderlySettings = async (
  tenderlySettings: TenderlySettings,
): Promise<void> => {
  const { tenderlyKey, tenderlyProject, tenderlyUsername } = tenderlySettings;
  try {
    tenderlyKeySchema.parse(tenderlyKey);

    await keytar.setPassword(service, accountTenderlyKey, tenderlyKey);
    await keytar.setPassword(service, accountTenderlyProject, tenderlyProject);
    await keytar.setPassword(
      service,
      accountTenderlyUsername,
      tenderlyUsername,
    );
    console.log(chalk.green('Tenderly settings stored successfully.'));
  } catch (error) {
    error instanceof z.ZodError
      ? console.error('Invalid input:', error.errors)
      : console.error('Failed to set Tenderly key:', error);
  }
};

export const getPrivateKey = async (): Promise<string | null> => {
  return keytar.getPassword(service, accountPrivateKey);
};

export const getTenderlySettings =
  async (): Promise<TenderlySettings | null> => {
    const tenderlyKey = await keytar.getPassword(service, accountTenderlyKey);
    const tenderlyProject = await keytar.getPassword(
      service,
      accountTenderlyProject,
    );
    const tenderlyUsername = await keytar.getPassword(
      service,
      accountTenderlyUsername,
    );
    return tenderlyKey && tenderlyProject && tenderlyUsername
      ? {
          tenderlyKey,
          tenderlyProject,
          tenderlyUsername,
        }
      : null;
  };
