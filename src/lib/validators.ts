import { Address, BuildMetadata, ReleaseMetadata } from 'src/types';
import { z } from 'zod';
import { exitWithMessage, strings } from './constants';
import { getPrivateKey } from './keys';
import {
  ethereumAddressSchema,
  buildMetadataSchema,
  releaseMetadataSchema,
  subdomainSchema,
  AllowedNetworks,
} from './schemas';

/**
 * Validates that a private key exists.
 *
 * @returns {Promise<void>} Immediately returns if the private key does not exist. If the private key exists, no return value.
 */
export const validatePrivateKey = async (): Promise<void> => {
  if (!(await getPrivateKey())) exitWithMessage(strings.PRIVATE_KEY_NOT_FOUND);
};

/**
 * Validates an Ethereum contract address against a Zod schema.
 *
 * @param {Address | undefined} contract - The contract address to be validated.
 * @returns {void} If contract is undefined, immediately returns. If validation fails, calls exitWithMessage function with the error message.
 */
export const validateAddress = (contract: Address | undefined): void => {
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
export const validateBuild = (build: BuildMetadata | string | undefined): void => {
  if (typeof build === 'undefined') return;
  if (typeof build === 'string') console.log('TO DO!'); // TODO:
  const res = buildMetadataSchema.safeParse(build);
  if (!res.success) exitWithMessage(res.error.message);
};

/**
 * Validates a ReleaseMetadata object against a Zod schema.
 *
 * @param {ReleaseMetadata | undefined} release - The ReleaseMetadata object to be validated.
 * @returns {void} If release is undefined, immediately returns. If validation fails, calls exitWithMessage function with the error message.
 */
export const validateRelease = (release: ReleaseMetadata | string | undefined): void => {
  if (typeof release === 'undefined') return;
  if (typeof release === 'string') console.log('TODO: NOT IMPLEMENTED'); // TODO:
  const res = releaseMetadataSchema.safeParse(release);
  if (!res.success) exitWithMessage(res.error.message);
};

/**
 * Validates a subdomain string against a Zod schema.
 *
 * @param {string | undefined} subdomain - The subdomain string to be validated.
 * @returns {void} If subdomain is undefined, immediately returns. If validation fails, calls exitWithMessage function with the error message.
 */
export const validateSubdomain = (subdomain: string | undefined): void => {
  if (typeof subdomain === 'undefined') return;

  const res = subdomainSchema.safeParse(subdomain);

  if (!res.success) exitWithMessage(res.error.message);
};

export const validateNetwork = (network: AllowedNetworks | undefined) => {
  if (typeof network === 'undefined') return;

  const { success, error } = z.string().safeParse(network);

  if (!success) {
    exitWithMessage(error.message);
  }
};
