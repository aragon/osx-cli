import inquirer from 'inquirer';
import { privateKeySchema, tenderlyKeySchema } from './keys.js';
import { ZodError } from 'zod';

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
