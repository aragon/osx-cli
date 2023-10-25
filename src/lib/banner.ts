import G from 'gradient-string';
import figlet from 'figlet';
import { strings } from './strings';

// colors brought in from vscode poimandres theme
const poimandresTheme = {
  blue: '#add7ff',
  cyan: '#89ddff',
  green: '#5de4c7',
  magenta: '#fae4fc',
  red: '#d0679d',
  yellow: '#fffac2',
};

export const gradient = G(Object.values(poimandresTheme));
export const Banner = () => {
  console.log(gradient.multiline(figlet.textSync('OSX CLI', { font: 'ANSI Shadow' })));
  console.log(gradient(strings.BANNER), '\n\n');
};
