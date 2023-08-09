import { InfoOptions } from 'src/types';
import { downloadFromIPFS } from '~/lib/ipfs';
import { networkSelectionPrompt, pluginSelectionPrompt } from '~/lib/prompts';
import { findNetworkByName } from '~/lib/web3';
import { logTable } from '~/lib/constants';
import { strings } from '~/lib/strings';
import { findRepo, queryPluginRepos } from '~/lib/subgraph';
import { validateNetwork, validateSubdomain } from '~/lib/validators';

export const infoHandler: (...args: any[]) => void | Promise<void> = async (
  repoName?: string,
  options: InfoOptions = {},
) => {
  validateSubdomain(repoName);
  validateNetwork(options.network);

  const network = options.network ? findNetworkByName(options.network) : await networkSelectionPrompt();
  const pluginRepos = await queryPluginRepos(network.subgraph);
  const plugin = repoName ? findRepo(repoName, pluginRepos) : await pluginSelectionPrompt(pluginRepos);

  const releaseMetadata = await downloadFromIPFS(plugin?.releases[-1]?.metadata);

  const latestRelease = plugin.releases.reduce((maxRelease, currentRelease) => {
    return currentRelease.release > maxRelease.release ? currentRelease : maxRelease;
  });

  const latestBuild = latestRelease.builds.reduce((maxBuild, currentBuild) => {
    return currentBuild.build > maxBuild.build ? currentBuild : maxBuild;
  });

  logTable([
    { NAME: releaseMetadata?.name || strings.NO_NAME_PROVIDED },
    { SUBDOMAIN: plugin?.subdomain },
    { DESCRIPTION: releaseMetadata?.description || strings.NO_DESCRIPTION_PROVIDED },
    { VERSION: `Release ${latestRelease.release} : Build ${latestBuild.build}` },
    { ADDRESS: plugin?.id },
  ]);
};
