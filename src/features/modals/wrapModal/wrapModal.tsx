import { useState } from 'react';

import { CurrencyInput } from '@/components/inputs';
import { BUTTON_PRESET } from '@/components/buttons';

import { ModalBase } from '../modalBase';

import {
  InputBox,
  Switch,
  SwitchBox,
  SwitchOption,
  Wrapper,
  Buttons,
  Button
} from './components';

type Props = {
  onClose: VoidFunction;
};

const OPTIONS: [SwitchOption, SwitchOption] = [{label: 'Wrap ETH', value: 'WRAP'}, {label: 'Unwrap ETH', value: 'UNWRAP'}]

export function WrapModal({onClose}: Props) {
    const [value, setValue] = useState(0)
    const [option, setOption] = useState(OPTIONS[0].value)

    const onInputChange = (val: string) => {
        const newVal = parseFloat(val);

        if (isNaN(newVal)) {
            setValue(0);
            return;
        }

        setValue(newVal);
    };

    return (
        <ModalBase title={'Pool details'} onClose={onClose}>
            <Wrapper>
                <SwitchBox>
                    <Switch options={OPTIONS} value={option} onChange={setOption}/>
                </SwitchBox>
                <InputBox>
                    <CurrencyInput value={value} onChange={onInputChange} onMax={() => setValue(1000)} ticker={'VC'} maxText={'SET MAX'}/>
                </InputBox>
                <Buttons>
                    <Button preset={BUTTON_PRESET.PINK}>Save</Button>
                </Buttons>
            </Wrapper>
        </ModalBase>
    );
}
