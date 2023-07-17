import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import { ZodError, ZodSchema, z } from 'zod';
import { Network, TenderlySettings, Address, CustomZodError } from 'src/types';
import {
  buildMetadataSchema,
  contractNameSchema,
  ethereumAddressSchema,
  privateKeySchema,
  releaseMetadataSchema,
  subdomainSchema,
  tenderlyKeySchema,
} from './schemas.js';
import { exitWithMessage, networks, strings, success } from './constants';
import inquirerFuzzyPath from 'inquirer-fuzzy-path';
import chalk from 'chalk';

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
    message: strings.PRIVATE_KEY,
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
  const { tenderlyUsername, tenderlyProject, tenderlyKey } = await inquirer.prompt([
    {
      type: 'input',
      name: 'tenderlyUsername',
      message: strings.TENDERLY_USERNAME,
      validate: (input: string) => !!input || 'Username cannot be empty',
    },
    {
      type: 'input',
      name: 'tenderlyProject',
      message: strings.TENDERLY_PROJECT,
      validate: (input: string) => !!input || 'Project name cannot be empty',
    },
    {
      type: 'password',
      name: 'tenderlyKey',
      message: strings.TENDERLY_KEY,
      validate: (input: string) => {
        try {
          tenderlyKeySchema.parse(input);
          return true;
        } catch (error) {
          if (error instanceof ZodError) {
            return error.errors[0].message;
          }
          return error;
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
    message: strings.NETWORK_SELECTION,
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
    message: strings.SETUP_NAME,
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
    message: strings.BUILD_FOLDER,
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

export const addressPrompt = async (message: string): Promise<Address> => {
  const { data } = await inquirer.prompt({
    type: 'input',
    name: 'data',
    message: message,
    validate: (input: string) => {
      try {
        ethereumAddressSchema.parse(input);
        return true;
      } catch (error) {
        if (error instanceof ZodError) {
          return error.errors[0].message;
        }
        return 'Invalid input.';
      }
    },
  });

  return data as Address;
};

inquirer.registerPrompt('fuzzypath', inquirerFuzzyPath);
export const filePrompt = async (excludedPaths: string[] = [], promptMessage: string): Promise<string> => {
  excludedPaths = ['node_modules', ...excludedPaths];
  const { filePath } = await inquirer.prompt({
    type: 'fuzzypath',
    name: 'filePath',
    message: promptMessage,
    excludePath: (nodePath: string) =>
      excludedPaths.some((excludedPath) => nodePath.startsWith(excludedPath)),
    itemType: 'file',
    rootPath: './',
    suggestOnly: false,
    depthLimit: 5,
  });

  return filePath;
};

export const metadataPrompt = async (schema: ZodSchema<any>, promptMessage: string) => {
  try {
    // Ask user to select the file
    const filePath = await filePrompt(['artifacts'], promptMessage);

    // Read and parse the file content
    const fileContent = await fs.promises.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(fileContent);

    // Validate the file content
    return schema.parse(jsonData);
  } catch (e) {
    e instanceof z.ZodError
      ? logZodError(e)
      : exitWithMessage(`Error reading file. Is this a valid JSON file?`);
  }
};

export const buildMetadataPrompt = async () =>
  metadataPrompt(buildMetadataSchema, strings.BUILD_METADATA_PROMPT);
export const releaseMetadataPrompt = async () =>
  metadataPrompt(releaseMetadataSchema, strings.RELEASE_METADATA_PROMPT);

const logZodError = (error: z.ZodError) => {
  let errorMsg = `\n${chalk.bold.yellow('Warning: Invalid JSON structure:')}\n\n`;
  error.errors.forEach((err: CustomZodError) => {
    const { expected, received } = err;
    errorMsg += `Expected ${chalk.bold.blue(err.path.join('.'))}: ${chalk.italic.yellow(
      expected,
    )}, received ${chalk.yellow(received)}.\n`;
  });
  console.error(errorMsg);
};

export const subDomainPrompt = async (): Promise<string> => {
  const { subdomain } = await inquirer.prompt({
    type: 'input',
    name: 'subdomain',
    message: 'Please enter the subdomain:',
    validate: (input: string) => {
      try {
        subdomainSchema.parse(input);
        return true;
      } catch (error) {
        if (error instanceof ZodError) {
          return error.errors[0].message;
        }
        return 'Invalid input.';
      }
    },
  });

  return subdomain;
};
