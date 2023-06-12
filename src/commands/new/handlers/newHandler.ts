import { spinnerSuccess, updateSpinnerText } from '../../../lib/spinners.js';

export const newHandler = async (): Promise<void> => {
  updateSpinnerText('Processing ');
  // do work
  await new Promise((resolve) => setTimeout(resolve, 1000)); // emulate work
  spinnerSuccess();
  console.table([
    { type: 'clones', name: 'Basic' },
    { type: 'clones', name: 'Governance' },
    { type: 'upgradable', name: 'Basic' },
    { type: 'upgradable', name: 'Governance' },
  ]);
};
