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

# AragonOSx Manager

The Aragon OSx Manager CLI is a command line tool supporting your plugin development process. It helps developers build, deploy, and publish plugins faster and easier.

## Getting Started

This project is intended to be used with the latest Active LTS release of [Node.js][nodejs].

To clone the repository, use the following commands:

```sh
git clone https://github.com/aragon/aragon-manager
cd aragon-manager
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
- `clean` - remove coverage data, vitest cache and transpiled files,
- `prebuild` - lint source files and tests before building,
- `build` - transpile TypeScript to ES6,
- `build:watch` - interactive watch mode to automatically transpile source files,
- `lint` - lint source files and tests,
- `prettier` - reformat files,
- `test` - run tests,
- `test:watch` - interactive watch mode to automatically re-run tests
