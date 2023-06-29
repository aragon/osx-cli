import { z } from 'zod';

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
    /^[a-zA-Z0-9-]*$/,
    'Tenderly key must only contain numbers and letters.',
  );

export const contractNameSchema = z
  .string()
  .nonempty({ message: 'Contract name cannot be empty.' })
  .regex(/^[a-zA-Z0-9]*$/, {
    message: 'Contract name can only contain numbers and letters.',
  });
