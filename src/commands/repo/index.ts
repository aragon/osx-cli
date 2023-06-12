import { Command, Option } from 'commander';
import { publishHandler } from './handlers/publishHandler.js';
import { upgradeHandler } from './handlers/upgradeHandler.js';
import { addMaintainerHandler } from './handlers/addMaintainerHandler.js';
import { removeMaintainerHandler } from './handlers/removeMaintainerHandler.js';
import { getBuildsHandler } from './handlers/getBuildsHandler.js';
import { getReleasesHandler } from './handlers/getReleasesHandler.js';
import { getLatestHandler } from './handlers/getLatestHandler.js';

export const repo = new Command('repo');

repo.description('commands for managing a plugin repository');

repo
  .command('publish')
  .description('publish a new plugin')
  .argument('[subdomain]', 'The plugin repository subdomain')
  .argument('[setup]', 'The path to the setup contract')
  .option('-r --release', 'The path to the release metadata')
  .option('-b --build', 'The path to the build metadata')
  .action(publishHandler);

repo
  .command('upgrade')
  .description('upgrade a plugin')
  .argument('[subdomain]', 'The plugin repository subdomain')
  .argument('[setup]', 'The path to the setup contract')
  .addOption(
    new Option(
      '-v, --bump-version <version>',
      'increment build or release',
    ).choices(['build', 'release']),
  )

  .action(upgradeHandler);

repo
  .command('add-maintainer')
  .description('add a maintainer to a plugin')
  .argument('[maintainer]', 'the maintainer')
  .action(addMaintainerHandler);

repo
  .command('remove-maintainer')
  .description('remove a maintainer from a plugin')
  .argument('[maintainer]', 'the maintainer')
  .action(removeMaintainerHandler);

repo
  .command('get-builds')
  .description('get the builds for a plugin release')
  .argument('[release]', 'the builds for this release')
  .action(getBuildsHandler);

repo
  .command('get-releases')
  .description('get the releases for a plugin')
  .action(getReleasesHandler);

repo
  .command('get-latest')
  .description('get the latest release for a plugin')
  .action(getLatestHandler);
