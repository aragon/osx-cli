import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import { ZodError } from 'zod';
import { Network } from 'src/types';
import {
  contractNameSchema,
  privateKeySchema,
  tenderlyKeySchema,
} from './schemas.js';
import { networks } from './constants';

export const confirmPrompt = async (message: string): Promise<boolean> => {
  const { data } = await inquirer.prompt({
    type: 'confirm',
    name: 'data',
    message,
  });

  return data;
};

export const privateKeyPrompt = async (): Promise<string> => {
  const { data } = await inquirer.prompt({
    type: 'password',
    name: 'data',
    message: 'Please enter a private key:',
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

export const tenderlyKeyPrompt = async (): Promise<string> => {
  const { data } = await inquirer.prompt({
    type: 'password',
    name: 'data',
    message: 'Please enter a Tenderly key:',
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
  });

  return data;
};

export const networkSelectionPrompt = async (): Promise<Network> => {
  const { selectedNetwork } = await inquirer.prompt({
    type: 'list',
    name: 'selectedNetwork',
    message: 'Please select a network:',
    choices: networks.map((network) => ({
      name: network.name,
      value: network,
    })),
  });

  return selectedNetwork;
};

export const contractNamePrompt = async (): Promise<string> => {
  const { contractName } = await inquirer.prompt({
    type: 'input',
    name: 'contractName',
    message: 'Please enter the Setup Contract name:',
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
    message:
      'Build Folder not detected. \nPlease enter the path to the build folder (relative to the current directory):',
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
