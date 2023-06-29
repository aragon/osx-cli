import fs from 'fs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import process from 'process';
import path from 'path';
import { findContractsBuildDirectory, findContractBuild } from './file';

describe('findContractsBuildDirectory function', () => {
  const projectDirectory = process.cwd();

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should return hardhat artifacts directory if it exists', () => {
    const artifactsPath = path.join(projectDirectory, 'artifacts');
    vi.spyOn(fs, 'existsSync').mockImplementation(
      (dir) => dir === artifactsPath,
    );
    const result = findContractsBuildDirectory(projectDirectory);
    expect(result).toEqual(artifactsPath);
  });

  it('should return foundry out directory if artifacts directory does not exist', () => {
    const outPath = path.join(projectDirectory, 'out');
    vi.spyOn(fs, 'existsSync').mockImplementation((dir) => dir === outPath);
    const result = findContractsBuildDirectory(projectDirectory);
    expect(result).toEqual(outPath);
  });

  it('should return undefined if no known build directory is found', () => {
    vi.spyOn(fs, 'existsSync').mockReturnValue(false);
    const result = findContractsBuildDirectory(projectDirectory);
    expect(result).toBeUndefined();
  });
});

describe('findContractBuild function', () => {
  const projectDirectory = process.cwd();
  const contractName = 'testContract';

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should return null if contract artifact is not found', () => {
    vi.spyOn(fs, 'existsSync').mockReturnValue(true);
    vi.spyOn(fs, 'readdirSync').mockReturnValue([]);
    const result = findContractBuild(contractName, projectDirectory);
    expect(result).toBeNull();
  });
});
