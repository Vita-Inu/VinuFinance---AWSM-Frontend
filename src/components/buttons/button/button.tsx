import { styled } from 'styled-components';
import { ReactNode } from 'react';

import { DEFAULT_COLOR_PRESET, presetColorMap } from './utils';
import { BUTTON_PRESET } from './types';

type Props = {
  children: ReactNode;
  preset?: BUTTON_PRESET;
  onClick?: VoidFunction;
};

const StyledButton = styled.div<{
  text: string;
  background: string;
  backgroundHovered: string;
}>`
  padding: 1.2rem 2.4rem;
  border-radius: 3rem;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5;
  background: ${(props) => props.background};
  color: ${(props) => props.text};
  transition: 0.2s ease-in-out;

  &:hover {
    background: ${(props) => props.backgroundHovered};
  }
`;

export const Button = ({ preset, ...props }: Props) => {
  const presetColors =
    (preset && presetColorMap.get(preset)) ?? DEFAULT_COLOR_PRESET;

  return (
    <StyledButton
      {...props}
      text={presetColors.text}
      background={presetColors.background}
      backgroundHovered={presetColors.backgroundHovered}
      role={'button'}
    />
  );
};
