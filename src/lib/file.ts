import os from 'os';
import path from 'path';
import fs from 'fs';
import { ContractArtifact } from 'src/types';
import { exitWithMessage } from './strings';

export const configDirPath =
  process.env.NODE_ENV === 'TEST' ? path.join(os.tmpdir(), '.aragon') : path.join(os.homedir(), '.aragon');
export const configFilePath = path.join(configDirPath, 'config.json');

/**
 * Finds the contracts build directory in the project directory.
 *
 * @param {string} [projectDirectory] - The path to the project directory. If not provided, the current working directory will be used.
 * @returns {string | null} - Returns the path to the contracts build directory or null if not found.
 */
export const findContractsBuildDirectory = (projectDirectory?: string): string | undefined => {
  projectDirectory = projectDirectory ?? process.cwd();

  // Hardhat build directory
  const hardhatArtifactsDirectory = path.join(projectDirectory, 'artifacts');
  if (fs.existsSync(hardhatArtifactsDirectory)) {
    return hardhatArtifactsDirectory;
  }

  // Foundry build directory
  const foundryOutDirectory = path.join(projectDirectory, 'out');
  if (fs.existsSync(foundryOutDirectory)) {
    return foundryOutDirectory;
  }
};

/**
 * Recursively searches the project directory for the build artifact of the given Solidity contract and returns its contents as a JSON object.
 *
 * @param {string} buildDirectory - The directory where the build artifacts are located.
 * @param {string} contractName - The name of the Solidity contract (without .sol extension).
 * @returns {ContractArtifact | null} - The contract artifact or null if not found.
 */
export const findContractBuild = (contractName: string, buildDirectory: string): ContractArtifact | null => {
  if (!fs.existsSync(buildDirectory)) {
    exitWithMessage(
      `Directory not found: ${buildDirectory} \nensure you are in the project root directory and you have compiled your contracts`,
    );
  }

  const searchDirectories = (dir: string): ContractArtifact | null => {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);

      const isDirectory = fs.statSync(filePath).isDirectory();

      // If it's a directory, perform a recursive search
      if (isDirectory) {
        // If directory matches contractName, look for the .json file
        if (file === `${contractName}.sol`) {
          const contractFiles = fs.readdirSync(filePath);
          for (const contractFile of contractFiles) {
            if (contractFile.endsWith('.json') && !contractFile.endsWith('.dbg.json')) {
              const contractFilePath = path.join(filePath, contractFile);
              const fileContent = fs.readFileSync(contractFilePath, 'utf8');

              return JSON.parse(fileContent);
            }
          }
        } else {
          const jsonObject = searchDirectories(filePath);

          if (jsonObject) return jsonObject;
        }
      }
    }
    return null;
  };

  return searchDirectories(buildDirectory);
};
