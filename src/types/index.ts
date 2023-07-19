import { BytesLike } from 'ethers';
import { ZodIssue, z } from 'zod';
import { activeContractsList } from '@aragon/osx-ethers';
import { buildMetadataSchema, ethereumAddressSchema, releaseMetadataSchema } from '~/lib/schemas';

export interface ContractArtifact {
  abi: any;
  bytecode: BytesLike;
  deployedBytecode: BytesLike;
}

export type AllowedNetworks = keyof typeof activeContractsList;

export type Network = {
  name: AllowedNetworks;
  id: string;
  url: string;
  explorer: string;
};

export interface TenderlySettings {
  tenderlyKey: string;
  tenderlyProject: string;
  tenderlyUsername: string;
}

export type ForkResult = {
  forkId: string;
  rpcUrl: string;
  forkUrl: string;
  forkProvider: any;
};

export type ContractDeploymentResult = {
  address: string | undefined;
  txHash: string | undefined;
};

export type Address = z.infer<typeof ethereumAddressSchema>;

export type BuildMetadata = z.infer<typeof buildMetadataSchema>;
export type ReleaseMetadata = z.infer<typeof releaseMetadataSchema>;

export type CustomZodError = ZodIssue & {
  path?: (string | number)[];
  type?: string;
  expected?: string;
  received?: string;
};

export interface PublishOptions {
  subdomain?: string;
  build?: string;
  release?: string;
  network?: AllowedNetworks;
  maintainer?: string;
  simulate?: boolean;
}
