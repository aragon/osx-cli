import { BytesLike } from 'ethers';

export interface ContractArtifact {
  abi: any;
  bytecode: BytesLike;
  deployedBytecode: BytesLike;
}

export type Network = {
  name: string;
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
