import { useRef } from 'react';
import NextImage from 'next/image';

import { Button, BUTTON_PRESET } from '@/components/buttons';

import { usePopup } from './hooks';
import {
  Box,
  Buttons,
  Icon,
  Input,
  Inputs,
  Popup,
  Title,
  Top,
  Close,
} from './components';
import SettingsIcon from './assets/settings.svg';
import CloseIcon from './assets/close.svg';

export function BorrowSettings() {
  const popupRef = useRef<HTMLDivElement>(null);

  const { isVisible, togglePopup, hidePopup, anchor } = usePopup(popupRef);

  const onClick = () => {
    //NOTE:: Save changed settings
    hidePopup();
  };

  return (
    <Box ref={popupRef}>
      <Icon
        src={SettingsIcon}
        alt={'settings'}
        width={20}
        height={20}
        role={'button'}
        onClick={togglePopup}
      />
      <Popup visible={isVisible} anchor={anchor} onClose={hidePopup}>
        <Top>
          <Title>Transaction Settings</Title>
          <Close onClick={hidePopup}>
            <NextImage src={CloseIcon} alt={'close'} width={14} height={14} />
          </Close>
        </Top>
        <Inputs>
          <Input postfix={'%'} label={'Slippage Tolerance Loan Amount'} />
          <Input postfix={'secs'} label={'Transaction Deadline'} />
        </Inputs>
        <Buttons>
          <Button preset={BUTTON_PRESET.PINK} onClick={onClick}>
            Apply
          </Button>
        </Buttons>
      </Popup>
    </Box>
  );
}
