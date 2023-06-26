import { InterfaceAbi, BytesLike } from 'ethers';

export interface ContractArtifact {
  abi: InterfaceAbi;
  bytecode: BytesLike;
  deployedBytecode: BytesLike;
}

export type Network = {
  name: string;
  url: string;
  explorer: string;
};
