import { Wallet } from '@ethersproject/wallet';
import {
  AddresslistVotingClient,
  Client,
  Context,
  ContextParams,
  MultisigClient,
  TokenVotingClient,
} from '@aragon/sdk-client';

import { activeContractsList } from '@aragon/osx-ethers';
import { AllowedNetworks } from 'src/types';
import { networks } from './constants';
import { getPrivateKey } from './keys';

const getContectParams = async (network: AllowedNetworks): Promise<ContextParams> => {
  const PRIVATE_KEY = await getPrivateKey();

  const RPC_URL: string = networks.find((n) => n.name === network)?.url || '';
  if (!RPC_URL) throw new Error(`RPC_URL not found for network: ${network}`);

  return {
    network,
    signer: PRIVATE_KEY ? new Wallet(PRIVATE_KEY) : Wallet.createRandom(),
    daoFactoryAddress: activeContractsList[network]?.['DAOFactory'] || '',
    web3Providers: [RPC_URL],
    ipfsNodes: [
      {
        url: 'https://test.ipfs.mock/',
        headers: { 'X-API-KEY': 'MOCK_TOKEN' },
      },
    ],
  };
};

export const context = async (network: AllowedNetworks) => new Context(await getContectParams(network));
export const client = async (network: AllowedNetworks) => new Client(await context(network));
export const multisigClient = async (network: AllowedNetworks) => new MultisigClient(await context(network));
export const tokenVotingClient = async (network: AllowedNetworks) =>
  new TokenVotingClient(await context(network));
export const addressListVotingClient = async (network: AllowedNetworks) =>
  new AddresslistVotingClient(await context(network));
