import { useEffect, useRef } from 'react';
import NextImage from 'next/image';

import { Button, BUTTON_PRESET } from '@/components/buttons';

import { usePopup, useBorrowSettings } from './hooks';
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

type Settings = {
  slippage: number,
  deadline: number
}

type Props = {
  defaultValues: Settings
  onSave: (values: Settings) => void
}

export function BorrowSettings({defaultValues, onSave}: Props) {
  const popupRef = useRef<HTMLDivElement>(null);

  const { slippageValue, deadlineValue, setSlippageValue, setDeadlineValue, getValidSettings} =
    useBorrowSettings({
      defaultSlippage: defaultValues.slippage.toString(),
      defaultDeadline: defaultValues.deadline.toString(),
    });

  const { isVisible, togglePopup, hidePopup, anchor } = usePopup(popupRef);

  useEffect(() => {
    if(!isVisible) return;

    setSlippageValue(defaultValues.slippage.toString())
    setDeadlineValue(defaultValues.deadline.toString())
  }, [isVisible, defaultValues.slippage, defaultValues.deadline, setSlippageValue, setDeadlineValue])

  const onClick = () => {
    const settings = getValidSettings()

    if(!settings) return;

    hidePopup();
    onSave(settings)
  };

  const isButtonDisabled = !getValidSettings()

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
          <Close onClick={() => hidePopup()}>
            <NextImage src={CloseIcon} alt={'close'} width={14} height={14} />
          </Close>
        </Top>
        <Inputs>
          <Input value={slippageValue} onChange={setSlippageValue} postfix={'%'} label={'Slippage Tolerance Loan Amount'} />
          <Input value={deadlineValue} onChange={setDeadlineValue} postfix={'secs'} label={'Transaction Deadline'} />
        </Inputs>
        <Buttons>
          <Button disabled={isButtonDisabled} preset={BUTTON_PRESET.PINK} onClick={onClick}>
            Apply
          </Button>
        </Buttons>
      </Popup>
    </Box>
  );
}
