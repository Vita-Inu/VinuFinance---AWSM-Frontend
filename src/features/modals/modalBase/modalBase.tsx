import { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';

import {
  Top,
  Box,
  Background,
  Content,
  Container,
  Wrapper,
  Title,
  Close,
} from './components';
import Image from 'next/image';

type Props = {
  title: string;
  children: ReactNode;
  onClose: VoidFunction;
};

function ModalContainer({ children, title, onClose }: Props) {
  return (
    <Wrapper>
      <Background onClick={onClose} />
      <Container>
        <Box>
          <Top>
            <Title>{title}</Title>
            <Close role={'button'} onClick={onClose}>
              <Image
                width={14}
                height={14}
                src={'/modal-close.svg'}
                alt={'Close modal'}
              />
            </Close>
          </Top>
          <Content>{children}</Content>
        </Box>
      </Container>
    </Wrapper>
  );
}

export const ModalBase: FC<Props> = ({ children, ...rest }) =>
  createPortal(
    <ModalContainer {...rest}>{children}</ModalContainer>,
    document.body,
  );
