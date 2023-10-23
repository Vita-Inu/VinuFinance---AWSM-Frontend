import { createPortal } from 'react-dom';
import { ReactNode } from 'react';

import { Logo } from '@/components/logo';

import { Top, Box, Wrapper, Close, Content } from './styled';

type Props = {
  children: ReactNode;
  onClose: VoidFunction;
};

function ModalRender({ children, onClose }: Props) {
  return (
    <Wrapper>
      <Box>
        <Top>
          <Logo />
          <Close onClick={onClose}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
            >
              <path
                d='M19.2931 0.1005L0.201172 19.1924L0.908279 19.8995L20.0002 0.807607L19.2931 0.1005Z'
                fill='white'
              />
              <path
                d='M20.0001 19.1925L0.908203 0.100586L0.201096 0.807693L19.293 19.8996L20.0001 19.1925Z'
                fill='white'
              />
            </svg>
          </Close>
        </Top>
        <Content>{children}</Content>
      </Box>
    </Wrapper>
  );
}

export const Modal = ({ children, ...rest }: Props) => {
  const anchor = document.querySelector('main');

  if (!anchor) return null;

  return createPortal(<ModalRender {...rest}>{children}</ModalRender>, anchor);
};
