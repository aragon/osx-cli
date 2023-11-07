# Aragon OSx CLI Changelog

# [1.3.0](https://github.com/aragon/osx-cli/compare/v1.2.0...v1.3.0) (2023-10-26)

### Bug Fixes

- add client-common ([02372d1](https://github.com/aragon/osx-cli/commit/02372d1cb86bba7e439bce7d6bc967e5f25c90a3))

### Features

- **bump release:** temporarily disable broken test ([5da7bec](https://github.com/aragon/osx-cli/commit/5da7bec39ff2155c8f464956e1ba1cf5a2d07247))

# [1.2.0](https://github.com/aragon/osx-cli/compare/v1.1.1...v1.2.0) (2023-10-26)

### Bug Fixes

- Ensure the config directory exist before test ([ce410cf](https://github.com/aragon/osx-cli/commit/ce410cf5e9db6ebb10f1c7f70296c3a4435180a5))
- fix ipfs pinning ([2079968](https://github.com/aragon/osx-cli/commit/2079968fbee323fc26575ad8ec0432d181593663))

### Features

- add aragon sdk ([c03503c](https://github.com/aragon/osx-cli/commit/c03503c8c6a5737cdc72a46da503faa3a15963f9))
- add banner ([e76676e](https://github.com/aragon/osx-cli/commit/e76676e71b377e433fa24c84be8005fb11093097))
- add base networks ([4bb3d39](https://github.com/aragon/osx-cli/commit/4bb3d39ab471b96554e1dad46eca128c5c43ab9f))

## [1.1.1](https://github.com/aragon/osx-cli/compare/v1.1.0...v1.1.1) (2023-09-19)

### Bug Fixes

- fix tenderly key handler ([6ba6776](https://github.com/aragon/osx-cli/commit/6ba677681123cad64fe39e47bdbcea45e2bafe32))

# [1.1.0](https://github.com/aragon/osx-cli/compare/v1.0.0...v1.1.0) (2023-09-18)

### Bug Fixes

- add dotenv for ipfs ([cc37f66](https://github.com/aragon/osx-cli/commit/cc37f667e0ce74028e54b953d4d5f9ea19661f45))
- always return the latest release metadata ([36111c2](https://github.com/aragon/osx-cli/commit/36111c2b7ad4f80e714a1d4f74e26476b912f478))
- build metadata cannot be undefined ([7293f22](https://github.com/aragon/osx-cli/commit/7293f22394b64113b898b0fc27f87b2cb6ba7671))
- check for undefined ([b052f9f](https://github.com/aragon/osx-cli/commit/b052f9fc3a6bd2e5b19f5ed197d1886317cfb4d7))
- fix env ([2e76c35](https://github.com/aragon/osx-cli/commit/2e76c352cdaa603f95a57053592eb6cf7dfe9829))
- fix foundry support for deploy command ([87dda37](https://github.com/aragon/osx-cli/commit/87dda3793448fb6be640cc3c37f27b7b270e3b14)), closes [#12](https://github.com/aragon/osx-cli/issues/12)
- metadata cannot be undefined ([1c0d4d7](https://github.com/aragon/osx-cli/commit/1c0d4d73caf438b112527c9497cc732f82d49168))
- prompt for tenderly settings if not found ([6e809b9](https://github.com/aragon/osx-cli/commit/6e809b923397eeaf2a7b8778849b7cde7e7789c2))

### Features

- add info command ([8ee9540](https://github.com/aragon/osx-cli/commit/8ee954083aaabd54612e73358b28802d6ff119ca))
- add plugin repos query ([b4658ab](https://github.com/aragon/osx-cli/commit/b4658ab1b0eeda2042a877a09fdf0f9bcbb20c9a))
- use new table helper ([64eb53d](https://github.com/aragon/osx-cli/commit/64eb53dcce95005a202639e19d6459dd88f555d9))

# 1.0.0 (2023-07-20)

### Bug Fixes

- down grade to ethers@^5 ([5a975f8](https://github.com/aragon/cli/commit/5a975f818049e3ecdd04d74242a394d995b1079c))
- **release-workflow:** corrects yarn command to be executed ([f23c99a](https://github.com/aragon/cli/commit/f23c99ae65bfe34c5fc171821205a6fd55ee2523))
- web3storage key ([7198eb9](https://github.com/aragon/cli/commit/7198eb93b5d35805bce4e8b6e902d7acacda8b0b))

### Features

- add deploy command ([c0c2e9a](https://github.com/aragon/cli/commit/c0c2e9a431254fcf9d5ddc5f56ddb72dcd87de15))
- add tenderly username, project ([f7727a6](https://github.com/aragon/cli/commit/f7727a674fc022666c9c350fc736d674985e5443))
- **ci:** updates github main workflow and adds trivy scanner ([1e63daf](https://github.com/aragon/cli/commit/1e63daf0d3988173fa96ac0138c5da28010b37d5))
- finish deploy ([2c6bba2](https://github.com/aragon/cli/commit/2c6bba2fc6529d3c0bbff27ff68cf362145bd553))
- publish command, rough working ([74e9bf0](https://github.com/aragon/cli/commit/74e9bf02e5243f1273b32ffa880e7552e5b432cc))
