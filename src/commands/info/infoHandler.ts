import { PublishOptions } from 'src/types';
import { downloadFromIPFS } from '~/lib/ipfs';
import { networkSelectionPrompt, pluginSelectionPrompt } from '~/lib/prompts';
import { findNetworkByName } from '~/lib/web3';
import Table from 'cli-table3';
import { strings } from '~/lib/constants';

export const infoHandler: (...args: any[]) => void | Promise<void> = async (options: PublishOptions = {}) => {
  const network = options.network ? findNetworkByName(options.network) : await networkSelectionPrompt();
  const plugin = await pluginSelectionPrompt(network.subgraph);

  const releaseMetadata = await downloadFromIPFS(plugin.releases[0].metadata);

  const table = new Table();
  table.push(
    { NAME: releaseMetadata.name || strings.NO_NAME_PROVIDED },
    { SUBDOMAIN: plugin.subdomain },
    { DESCRIPTION: releaseMetadata.description || strings.NO_DESCRIPTION_PROVIDED },
    { ADDRESS: plugin.id },
  );
  console.log(table.toString());
};
