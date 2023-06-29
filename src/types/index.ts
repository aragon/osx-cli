import { BytesLike } from 'ethers';

export interface ContractArtifact {
  abi: any;
  bytecode: BytesLike;
  deployedBytecode: BytesLike;
}

export type Network = {
  name: string;
  url: string;
  explorer: string;
};
