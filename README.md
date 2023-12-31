![Aragon](https://res.cloudinary.com/dacofvu8m/image/upload/v1677353961/Aragon%20CodeArena/osx_blue_logo_lqrvkr.png)

<p align="center">
  <a href="https://aragon.org/">Aragon website</a>
  •
  <a href="https://devs.aragon.org/">Developer Portal</a>
  •
  <a href="http://eepurl.com/icA7oj">Join our Developer Community</a>
  •
  <a href="https://aragonproject.typeform.com/dx-contribution">Contribute</a>
</p>

<br/>

# Aragon OSx CLI

Aragon OSx CLI is a command line tool supporting your plugin development process. It helps developers build, deploy, and publish plugins faster and easier.

## Quick Start

You can install the Aragon OSx CLI globally via npm:

```bash
npm install -g @aragon/osx-cli
```

Then, you will be able to run commands using this format:

```bash
aragon [command] [options]
```

Alternatively - you can use the CLI without installing it locally in your device, by using npx:

```bash
npx @aragon/osx-cli [command] [options]
```

## Commands

The Aragon OSx CLI contains several commands to help you develop plugins. All arguments are optional, each command will prompt for any arguments that were omitted in the command line.

### `deploy`

The deploy command deploys your Plugin Setup contract to whichever chain you determine.

**Usage**

```bash
aragon deploy [contract-name] [options]
```

**Options**

| Option         | Description                                                     | Example                           |
| -------------- | --------------------------------------------------------------- | --------------------------------- |
| -b, --build    | Full path to project build                                      | /Users/main/plugin-repo/artifacts |
| -n, --network  | Network to deploy to. Choices: mainnet, polygon, goerli, mumbai | mainnet                           |
| -s, --simulate | Simulate deployment                                             |                                   |

### `publish`

The publish command publishes your plugin to the Aragon OSx protocol. Under the hood, this is creating a `PluginRepo` instance for your plugin with its first version. If you'd like to learn more about what publishing a plugin into Aragon OSx means, check out our guide [here](https://devs.aragon.org/docs/osx/how-to-guides/plugin-development/publication/).

**Usage**

```bash
aragon publish [contract-address] [options]
```

**Options**

| Option           | Description                                                      | Example               |
| ---------------- | ---------------------------------------------------------------- | --------------------- |
| -n, --network    | Network to publish to. Choices: mainnet, polygon, goerli, mumbai | mainnet               |
| -s, --subdomain  | Subdomain for plugin                                             | my-plugin             |
| -b, --build      | Path to build metadata                                           | /path/to/build.json   |
| -r, --release    | Path to release metadata                                         | /path/to/release.json |
| -m, --maintainer | Maintainer address                                               | 0x...                 |
| --simulate       | Simulate publishing                                              |                       |

### `settings set-pk`

Store a new private key for signing transactions.

```
aragon settings set-pk [private-key]
```

### `settings set-tenderly`

Store a new Tenderly project and API key configuration. Checkout [this link](https://docs.tenderly.co/tenderly-sdk/basic-concepts-and-faqs) if your not sure how to find your settings

```
settings set-tenderly
```

### `settings view`

View current public key, private key hash, and Tenderly configuration.

```
aragon settings view
```

### `info`

The `info` command provides information about a Plugin's `PluginRepo` instance. This information can be used to determine the properties and status of a plugin within its repo.

**Usage**

```bash
aragon info [repoName] [options]
```

**Options**

| Option        | Description                                                                         | Example |
| ------------- | ----------------------------------------------------------------------------------- | ------- |
| -n, --network | Network where the Plugin is published in. Choices: mainnet, polygon, goerli, mumbai | mainnet |

In this example, `info` command will fetch the information about the `my-plugin` repository from the `mainnet` network.

## Developing the CLI

This project is intended to be used with the latest Active LTS release of [Node.js](https://nodejs.org/en).

To clone the repository, use the following commands:

```sh
git clone https://github.com/aragon/cli
cd cli
yarn install
```

In one terminal, run the build in watch mode through using the following command:

```sh
yarn build:watch
```

In another terminal, run the CLI using the following command:

```sh
yarn dev
```

## Available Scripts

- `dev` - build & run the cli
- `clean` - remove coverage data, vitest cache and transpiled files
- `prebuild` - lint source files and tests before building
- `build` - transpile TypeScript to ES6
- `build:watch` - interactive watch mode to automatically transpile source files
- `lint` - lint source files and tests
- `prettier` - reformat files
- `test` - run tests
- `test:watch` - interactive watch mode to automatically re-run tests

## Security

If you believe you've found a security issue, we encourage you to notify us. We welcome working with you to resolve the issue promptly.

Security Contact Email: sirt@aragon.org

Please do not use the issue tracker for security issues.
