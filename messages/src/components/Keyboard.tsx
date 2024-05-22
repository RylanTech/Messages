import { registerPlugin } from '@capacitor/core';
import { Keyboard } from '@capacitor/keyboard';

const keyboard = registerPlugin('Keyboard', {
  web: () => import('@capacitor/keyboard').then(m => m.Keyboard),
});

export default keyboard;