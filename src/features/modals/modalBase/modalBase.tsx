import { FC, ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

import CloseIcon from './assets/modal-close.svg';
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

type Props = {
  title: string;
  children: ReactNode;
  onClose: VoidFunction;
};

function ModalContainer({ children, title, onClose }: Props) {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Wrapper>
      <Background $visible={mounted} onClick={onClose} />
      <Container>
        <Box $visible={mounted}>
          <Top>
            <Title>{title}</Title>
            <Close role={'button'} onClick={onClose}>
              <Image
                width={14}
                height={14}
                src={CloseIcon}
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

export const ModalBase: FC<Props> = ({ children, ...rest }) => {
  const anchor = document.querySelector('main');

  if (!anchor) return null;

  return createPortal(
    <ModalContainer {...rest}>{children}</ModalContainer>,
    anchor,
  );
};
