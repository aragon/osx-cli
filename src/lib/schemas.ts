import { z } from 'zod';
import { activeContractsList } from '@aragon/osx-ethers';

// Define the schema for the private key
export const privateKeySchema = z
  .string()
  .length(64, 'Private key must be exactly 64 characters long.')
  .regex(/^[a-fA-F0-9]*$/, 'Private key must only contain hexadecimal characters.');

// Define the schema for the Tenderly key
export const tenderlyKeySchema = z
  .string()
  .length(32, 'Tenderly key must be exactly 32 characters long.')
  .regex(/^[a-zA-Z0-9-]*$/, 'Tenderly key must only contain numbers and letters.');

// user config for the cli
export const configSchema = z.object({
  privateKey: privateKeySchema.optional(),
  tenderlyKey: tenderlyKeySchema.optional(),
  tenderlyProject: z.string().optional(),
  tenderlyUsername: z.string().optional(),
});

export const contractNameSchema = z
  .string()
  .nonempty({ message: 'Contract name cannot be empty.' })
  .regex(/^[a-zA-Z0-9]*$/, {
    message: 'Contract name can only contain numbers and letters.',
  });

export const ethereumAddressSchema = z.string().refine(
  (value) => {
    const ethereumAddressPattern = /^0x[a-fA-F0-9]{40}$/;
    return ethereumAddressPattern.test(value);
  },
  {
    message: 'Invalid Ethereum address',
  },
);

const AllowedNetworksSchema: z.ZodEnum<[string, ...string[]]> = z.enum(
  Object.keys(activeContractsList) as [string, ...string[]],
);

export type AllowedNetworks = z.infer<typeof AllowedNetworksSchema>;

export const releaseMetadataSchema = z.object({
  name: z.string(),
  description: z.string(),
  images: z.record(z.unknown()),
});

const inputSchema = z.object({
  name: z.string(),
  type: z.string(),
  internalType: z.string(),
  description: z.string().optional(),
});

const prepareSchema = z.object({
  description: z.string().optional(),
  inputs: z.array(inputSchema).optional(),
});

const pluginSetupSchema = z.object({
  prepareInstallation: prepareSchema.optional(),
  prepareUpdate: prepareSchema.optional(),
  prepareUninstallation: prepareSchema.optional(),
});

export const buildMetadataSchema = z.object({
  ui: z.record(z.unknown()),
  change: z.string(),
  pluginSetup: pluginSetupSchema,
});

export const subdomainSchema = z.string().regex(/^[a-z0-9-]+$/i, {
  message:
    'Subdomains can only contain alphanumeric characters and dashes. All letters should be lower cased.',
});

export const ipfsUriSchema = z
  .string()
  .refine((uri) => uri.startsWith('ipfs://'), {
    message: 'URI must start with ipfs://',
  })
  .refine(
    (uri) => {
      const parts = uri.split('ipfs://')[1];
      return parts && parts.length > 0;
    },
    {
      message: 'URI must include a CID after ipfs://',
    },
  );

export type IpfsUri = z.infer<typeof ipfsUriSchema>;
