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
  subgraph: string;
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

/**
 * Interface representing a plugin setup.
 */
export interface PluginSetup {
  id: string;
}

/**
 * Interface representing a build.
 */
export interface Build {
  build: number;
  metadata: string;
  pluginSetup: PluginSetup;
}

/**
 * Interface representing a release.
 */
export interface Release {
  release: number;
  metadata: string;
  builds: Build[];
}

/**
 * Interface representing a plugin repository.
 */
export interface PluginRepo {
  id: string;
  subdomain: string;
  releases: Release[];
}
