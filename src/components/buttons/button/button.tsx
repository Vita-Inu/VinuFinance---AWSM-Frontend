import { css, styled } from 'styled-components';
import { ReactNode } from 'react';

import { DEFAULT_COLOR_PRESET, presetColorMap } from './utils';
import { BUTTON_PRESET, BUTTON_SIZE } from './types';

type Props = {
  children: ReactNode;
  preset?: BUTTON_PRESET;
  size?: BUTTON_SIZE;
  onClick?: VoidFunction;
  disabled?: boolean;
};

const StyledButton = styled.div<{
  $text: string;
  $background: string;
  $backgroundHovered: string;
  $disabled?: boolean;
  size?: BUTTON_SIZE;
}>`
  padding: 1.2rem 2.4rem;
  border-radius: 3rem;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  background: ${(props) => props.$background};
  color: ${(props) => props.$text};
  transition: 0.2s ease-in-out;

  &:hover {
    background: ${(props) => props.$backgroundHovered};
  }

  ${(props) =>
    props.size === BUTTON_SIZE.TINY &&
    css`
      padding: 0.6rem 1.6rem;
      line-height: 1.2;
    `}

  ${(props) =>
    props.$disabled &&
    css`
      pointer-events: none;
      background: rgba(255, 255, 255, 0.15);
      color: rgba(255, 255, 255, 0.45);
    `}
`;

export const Button = ({ preset, disabled, ...props }: Props) => {
  const presetColors =
    (preset && presetColorMap.get(preset)) ?? DEFAULT_COLOR_PRESET;

  return (
    <StyledButton
      {...props}
      $disabled={disabled}
      $text={presetColors.text}
      $background={presetColors.background}
      $backgroundHovered={presetColors.backgroundHovered}
      role={'button'}
    />
  );
};
