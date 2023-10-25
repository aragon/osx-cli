import { Wallet } from "@ethersproject/wallet";
import { AddresslistVotingClient, Client, Context, ContextParams, MultisigClient, TokenVotingClient } from "@aragon/sdk-client";

import { activeContractsList } from "@aragon/osx-ethers";
import { AllowedNetworks } from "src/types";
import { networks } from "./constants";



const getContectParams = (network: AllowedNetworks): ContextParams => {
    const IPFS_API_KEY = process.env.IPFS_API_KEY
    const PRIVATE_KEY = process.env.PRIVATE_KEY

    if (!PRIVATE_KEY) throw new Error("PRIVATE_KEY not provided");
    if (!IPFS_API_KEY) throw new Error("IPFS_API_KEY not provided");


    const RPC_URL: string = networks.find((n) => n.name === network)?.url || "";
    if (!RPC_URL) throw new Error(`RPC_URL not found for network: ${network}`);


    return {
        network,
        signer: new Wallet(PRIVATE_KEY),
        daoFactoryAddress: activeContractsList[network]?.["DAOFactory"] || "",
        web3Providers: [RPC_URL],
        ipfsNodes: [
            {
                url: "https://test.ipfs.aragon.network/api/v0",
                headers: { "X-API-KEY": IPFS_API_KEY || "" },
            },
        ],
        // Optional. By default it will use Aragon's provided endpoints.
        // They will switch depending on the network (production, development)
        graphqlNodes: [
            {
                url: "https://subgraph.satsuma-prod.com/qHR2wGfc5RLi6/aragon/osx-goerli/api",
            },
        ],
    }
}

export const context = (network: AllowedNetworks) => new Context(getContectParams(network));
export const client = (network: AllowedNetworks) => new Client(context(network));
export const multisigClient = (network: AllowedNetworks) => new MultisigClient(context(network));
export const tokenVotingClient = (network: AllowedNetworks) => new TokenVotingClient(context(network));
export const addressListVotingClient = (network: AllowedNetworks) => new AddresslistVotingClient(context(network));
