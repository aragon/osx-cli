import { spinnerSuccess, updateSpinnerText } from '../../../lib/spinners.js';

export const viewHandler: (...args: unknown[]) => void | Promise<void> = async (
  id,
  _options,
) => {
  updateSpinnerText('Getting widget ' + id);
  await new Promise((resolve) => setTimeout(resolve, 3000));
  spinnerSuccess();
  console.log('Not implemented yet');
};
