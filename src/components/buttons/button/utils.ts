import { BUTTON_PRESET } from './types';

type ColorPreset = {
  text: string;
  background: string;
  backgroundHovered: string;
};

export const DEFAULT_COLOR_PRESET: ColorPreset = {
  background: '#FFF',
  backgroundHovered: 'rgba(255, 255, 255, 0.60)',
  text: '#000',
};

export const presetColorMap = new Map<BUTTON_PRESET, ColorPreset>([
  [
    BUTTON_PRESET.PINK,
    { background: '#DFCEFD', backgroundHovered: '#C4A3FF', text: '#000' },
  ],
  [
    BUTTON_PRESET.PURPLE,
    { background: '#4E415E', backgroundHovered: '#150D1D', text: '#fff' },
  ],
  [BUTTON_PRESET.WHITE, DEFAULT_COLOR_PRESET],
]);
