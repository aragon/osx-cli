import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import { ZodError } from 'zod';
import { Network, TenderlySettings } from 'src/types';
import {
  contractNameSchema,
  privateKeySchema,
  tenderlyKeySchema,
} from './schemas.js';
import { networks, prompts, success } from './constants';

export const confirmPrompt = async (message: string): Promise<boolean> => {
  const { data } = await inquirer.prompt({
    type: 'confirm',
    name: 'data',
    message: success(message),
  });

  return data;
};

export const privateKeyPrompt = async (): Promise<string> => {
  const { data } = await inquirer.prompt({
    type: 'password',
    name: 'data',
    message: prompts.PRIVATE_KEY,
    validate: (input: string) => {
      try {
        privateKeySchema.parse(input);
        return true;
      } catch (error) {
        if (error instanceof ZodError) {
          return error.errors[0].message;
        }
        return 'Invalid input.';
      }
    },
  });

  return data;
};

export const tenderlyPrompt = async (): Promise<TenderlySettings> => {
  const { tenderlyUsername, tenderlyProject, tenderlyKey } =
    await inquirer.prompt([
      {
        type: 'input',
        name: 'tenderlyUsername',
        message: prompts.TENDERLY_USERNAME,
        validate: (input: string) => !!input || 'Username cannot be empty',
      },
      {
        type: 'input',
        name: 'tenderlyProject',
        message: prompts.TENDERLY_PROJECT,
        validate: (input: string) => !!input || 'Project name cannot be empty',
      },
      {
        type: 'password',
        name: 'tenderlyKey',
        message: prompts.TENDERLY_KEY,
        validate: (input: string) => {
          try {
            tenderlyKeySchema.parse(input);
            return true;
          } catch (error) {
            if (error instanceof ZodError) {
              return error.errors[0].message;
            }
            return 'Invalid input.';
          }
        },
      },
    ]);

  return { tenderlyUsername, tenderlyProject, tenderlyKey };
};

export const networkSelectionPrompt = async (): Promise<Network> => {
  const { selectedNetwork } = await inquirer.prompt({
    type: 'list',
    name: 'selectedNetwork',
    message: prompts.NETWORK_SELECTION,
    choices: Object.entries(networks).map(([name, network]) => ({
      name: name,
      value: { name: network },
    })),
  });

  return selectedNetwork;
};

export const contractNamePrompt = async (): Promise<string> => {
  const { contractName } = await inquirer.prompt({
    type: 'input',
    name: 'contractName',
    message: prompts.SETUP_NAME,
    validate: (input: string) => {
      try {
        contractNameSchema.parse(input);
        return true;
      } catch (error) {
        if (error instanceof ZodError) {
          return error.errors[0].message;
        }
        return 'Invalid input.';
      }
    },
  });

  return contractName;
};

export const buildFolderPrompt = async (): Promise<string> => {
  const { buildFolderPath } = await inquirer.prompt({
    type: 'input',
    name: 'buildFolderPath',
    message: prompts.BUILD_FOLDER,
    validate: (input: string) => {
      const fullPath = path.join(process.cwd(), input);
      if (fs.existsSync(fullPath) && fs.lstatSync(fullPath).isDirectory()) {
        return true;
      } else {
        return 'The folder does not exist or is not a directory. Please enter a valid path relative to the current directory.';
      }
    },
  });

  return path.join(process.cwd(), buildFolderPath);
};
