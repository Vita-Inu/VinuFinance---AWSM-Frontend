import { css, keyframes, styled } from 'styled-components';
import { ReactNode } from 'react';

import { DEFAULT_COLOR_PRESET, presetColorMap } from './utils';
import { BUTTON_PRESET, BUTTON_SIZE } from './types';

type Props = {
  children: ReactNode;
  preset?: BUTTON_PRESET;
  size?: BUTTON_SIZE;
  onClick?: VoidFunction;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
};

const rotate = keyframes`
  from {
    transform: translate3d(-50%, -50%, 0) rotate(0deg);
  }

  to {
    transform: translate3d(-50%, -50%, 0) rotate(360deg) 
  }
`;

const StyledButton = styled.div<{
  $text: string;
  $background: string;
  $backgroundHovered: string;
  $disabled?: boolean;
  $loading?: boolean;
  $fullWidth?: boolean;
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
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;

  @media (max-width: 767px) {
    font-size: 1.4rem;
  }

  & > svg {
    width: 1.4rem;
    height: 1.4rem;
    position: relative;
    top: 0.1rem;
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2rem;
    height: 2rem;
    border-top: 0.1rem solid rgba(255, 255, 255, 0.45);
    border-radius: 50%;
    animation: ${rotate} 1s linear infinite;
    transition: 0.2s ease-in-out;
    opacity: 0;
  }

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

  ${(props) =>
    props.$loading &&
    css`
      pointer-events: none;
      background: rgba(255, 255, 255, 0.15);
      color: transparent;

      &:before {
        opacity: 1;
      }
    `}

  ${(props) =>
    props.$fullWidth &&
    css`
      width: 100%;
    `}
`;

export const Button = ({
  preset,
  disabled,
  fullWidth,
  loading,
  ...props
}: Props) => {
  const presetColors =
    (preset && presetColorMap.get(preset)) ?? DEFAULT_COLOR_PRESET;

  return (
    <StyledButton
      {...props}
      $disabled={disabled}
      $loading={loading}
      $fullWidth={fullWidth}
      $text={presetColors.text}
      $background={presetColors.background}
      $backgroundHovered={presetColors.backgroundHovered}
      role={'button'}
    />
  );
};
