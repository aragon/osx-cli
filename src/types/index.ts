import { InterfaceAbi, BytesLike } from 'ethers';

export interface ContractArtifact {
  abi: InterfaceAbi;
  bytecode: BytesLike;
  deployedBytecode: BytesLike;
}

export enum Networks {
  MAINNET = 'https://rpc.ankr.com/eth',
  GOERLI = 'https://rpc.ankr.com/eth_goerli',
  POLYGON = 'https://rpc.ankr.com/polygon',
  MUMBAI = 'https://rpc.ankr.com/polygon_mumbai',
}
