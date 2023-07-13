import { Address, AllowedNetworks, BuildMetadata, ReleaseMetadata } from 'src/types';
import { z } from 'zod';
import { exitWithMessage, strings } from '~/lib/constants';
import { uploadToIPFS } from '~/lib/ipfs';
import { getPrivateKey } from '~/lib/keys';
import {
  addressPrompt,
  buildMetadataPrompt,
  confirmPrompt,
  networkSelectionPrompt,
  releaseMetadataPrompt,
  subDomainPrompt,
} from '~/lib/prompts';
import {
  buildMetadataSchema,
  ethereumAddressSchema,
  releaseMetadataSchema,
  subdomainSchema,
} from '~/lib/schemas';
import { spinnerSuccess, updateSpinnerText } from '~/lib/spinners';
import { findNetworkByName, publish, simulatePublish } from '~/lib/web3';

interface PublishOptions {
  subdomain?: string;
  build?: string;
  release?: string;
  network?: AllowedNetworks;
  maintainer?: string;
  simulate?: boolean;
}

export const publishHandler: (...args: any[]) => void | Promise<void> = async (
  contract?: Address,
  options: PublishOptions = {},
) => {

  await validatePrivateKey();
  validateAddress(contract);
  validateSubdomain(options.subdomain);
  validateBuild(options.build);
  validateRelease(options.release);
  validateNetwork(options.network);

  const setupContract = contract ?? (await addressPrompt('Please enter a contract address:'));
  const subdomain = options.subdomain ?? (await subDomainPrompt());
  const build = options.build ?? (await buildMetadataPrompt());
  const release = options.release ?? (await releaseMetadataPrompt());
  const network = options.network ? findNetworkByName(options.network) : await networkSelectionPrompt();
  const maintainer = options.maintainer ?? (await addressPrompt("Please enter a maintainer's address:"));

  console.table({
    setupContract,
    subdomain: `${subdomain}.plugin.dao.eth`,
    chain: network.name,
    maintainer,
  });

  const simulate = options.simulate ?? (await confirmPrompt(strings.SIMULATE_DEPLOYMENT));
  if (simulate) await simulatePublish(setupContract, network, subdomain, maintainer);

  // confirm publish
  const confirm = await confirmPrompt(strings.CONFIRM_PUBLISH);
  if (!confirm) exitWithMessage(strings.ABORTED);

  try {
    updateSpinnerText('Uploading Build Metadata...');
    const buildCID = await uploadToIPFS(JSON.stringify(build, null, 2));
    spinnerSuccess(`Build Metadata: https://ipfs.io/ipfs/${buildCID}`);

    updateSpinnerText('Uploading Release Metadata...');
    const releaseCID = await uploadToIPFS(JSON.stringify(release, null, 2));
    spinnerSuccess(`Release Metadata: https://ipfs.io/ipfs/${releaseCID}`);

    const {address, txHash} = await publish(setupContract, subdomain, maintainer, buildCID, releaseCID, network);

    console.log(strings.DEPLOYED(`${subdomain}.plugin.dao.eth`, address, network.name));
    console.log(strings.EXPLORER(network.explorer, txHash));



  } catch (error) {
    const e = error as Error;
    console.error(e.message);
    exitWithMessage("Failed to publish");
  }
  // publish to IPFS


};

/**
 * Validates that a private key exists.
 *
 * @returns {Promise<void>} Immediately returns if the private key does not exist. If the private key exists, no return value.
 */
const validatePrivateKey = async (): Promise<void> => {
  if (!(await getPrivateKey())) exitWithMessage(strings.PRIVATE_KEY_NOT_FOUND);
};

/**
 * Validates an Ethereum contract address against a Zod schema.
 *
 * @param {Address | undefined} contract - The contract address to be validated.
 * @returns {void} If contract is undefined, immediately returns. If validation fails, calls exitWithMessage function with the error message.
 */
const validateAddress = (contract: Address | undefined): void => {
  console.log("validate address")
  if (typeof contract === 'undefined') return;

  const res = ethereumAddressSchema.safeParse(contract);
  if (!res.success) exitWithMessage(res.error.message);
};

/**
 * Validates a BuildMetadata object against a Zod schema.
 *
 * @param {BuildMetadata | undefined} build - The BuildMetadata object to be validated.
 * @returns {void} If build is undefined, immediately returns. If validation fails, calls exitWithMessage function with the error message.
 */
const validateBuild = (build: BuildMetadata | string | undefined): void => {
  if (typeof build === 'undefined') return;
  if (typeof build === 'string') console.log("TO DO!") // TODO:
  const res = buildMetadataSchema.safeParse(build);
  if (!res.success) exitWithMessage(res.error.message);
};

/**
 * Validates a ReleaseMetadata object against a Zod schema.
 *
 * @param {ReleaseMetadata | undefined} release - The ReleaseMetadata object to be validated.
 * @returns {void} If release is undefined, immediately returns. If validation fails, calls exitWithMessage function with the error message.
 */
const validateRelease = (release: ReleaseMetadata | string | undefined): void => {
  if (typeof release === 'undefined') return;
  if (typeof release === 'string') console.log("TODO: NOT IMPLEMENTED")// TODO:
  const res = releaseMetadataSchema.safeParse(release);
  if (!res.success) exitWithMessage(res.error.message);
};

/**
 * Validates a subdomain string against a Zod schema.
 *
 * @param {string | undefined} subdomain - The subdomain string to be validated.
 * @returns {void} If subdomain is undefined, immediately returns. If validation fails, calls exitWithMessage function with the error message.
 */
const validateSubdomain = (subdomain: string | undefined): void => {
  console.log("validate subdomain")
  if (typeof subdomain === 'undefined') return;

  const res = subdomainSchema.safeParse(subdomain);

  if (!res.success) exitWithMessage(res.error.message);
};

const validateNetwork = (network: AllowedNetworks | undefined) => {
  if (typeof network === 'undefined') return;

  const { success, error } = z.string().safeParse(network);

  if (!success) {
    exitWithMessage(error.message);

  }
};
