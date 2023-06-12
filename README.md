![Aragon](https://res.cloudinary.com/dacofvu8m/image/upload/v1677353961/Aragon%20CodeArena/osx_blue_logo_lqrvkr.png)

# Aragon Manager

## Getting Started

This project is intended to be used with the latest Active LTS release of [Node.js][nodejs].

To clone the repository, use the following commands:

```sh
git clone https://github.com/aragon/aragon-manager
cd aragon-manager
pnpm install
```

In one terminal run build in watch mode 

```sh
pnpm build:watch
```

In another run the cli with 

```sh
node ./build/src/main.js new 
```

## Available Scripts

- `clean` - remove coverage data, Jest cache and transpiled files,
- `prebuild` - lint source files and tests before building,
- `build` - transpile TypeScript to ES6,
- `build:watch` - interactive watch mode to automatically transpile source files,
- `lint` - lint source files and tests,
- `prettier` - reformat files,
- `test` - run tests,
- `test:watch` - interactive watch mode to automatically re-run tests
