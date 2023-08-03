import { Address, PublishOptions } from 'src/types';
import { logTable } from '~/lib/constants';
import { exitWithMessage, strings } from '~/lib/strings';
import { uploadMetadata } from '~/lib/ipfs';
import { getTenderlySettings } from '~/lib/keys';
import {
  addressPrompt,
  buildMetadataPrompt,
  confirmPrompt,
  networkSelectionPrompt,
  releaseMetadataPrompt,
  subDomainPrompt,
} from '~/lib/prompts';
import {
  validatePrivateKey,
  validateAddress,
  validateSubdomain,
  validateBuild,
  validateRelease,
  validateNetwork,
} from '~/lib/validators';
import { findNetworkByName, publish, simulatePublish } from '~/lib/web3';
import { tenderlyKeyHandler } from '../settings/handlers/tenderlyKeyHandler';

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

  const setupContract = contract ?? (await addressPrompt(strings.CONTRACT_ADDRESS));
  const subdomain = options.subdomain ?? (await subDomainPrompt());
  const build = options.build ?? (await buildMetadataPrompt());
  const release = options.release ?? (await releaseMetadataPrompt());
  const network = options.network ? findNetworkByName(options.network) : await networkSelectionPrompt();
  const maintainer = options.maintainer ?? (await addressPrompt(strings.MAINTAINER_ADDRESS));

  logTable([
    { setupContract },
    { subdomain: `${subdomain}.plugin.dao.eth` },
    { chain: network.name },
    { maintainer },
  ]);

  const simulate = options.simulate ?? (await confirmPrompt(strings.SIMULATE_DEPLOYMENT));
  if (simulate) {
    (await getTenderlySettings()) ?? (await tenderlyKeyHandler());
    await simulatePublish(setupContract, network, subdomain, maintainer);
  }

  const confirm = await confirmPrompt(strings.CONFIRM_PUBLISH);
  if (!confirm) exitWithMessage(strings.ABORTED);

  try {
    const buildCID = await uploadMetadata(build, 'Build');
    const releaseCID = await uploadMetadata(release, 'Release');

    const { address, txHash } = await publish(
      setupContract,
      subdomain,
      maintainer,
      buildCID,
      releaseCID,
      network,
    );

    console.log(strings.DEPLOYED(`${subdomain}.plugin.dao.eth`, address, network.name));
    console.log(strings.EXPLORER(network.explorer, txHash));
  } catch (error) {
    const e = error as Error;
    console.error(e.message);
    exitWithMessage('Failed to publish');
  }
};
