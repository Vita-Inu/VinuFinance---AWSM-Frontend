import {useState} from 'react';

import {CurrencyInput} from '@/components/inputs';
import {BUTTON_PRESET} from '@/components/buttons';

import {ModalBase} from '../modalBase';

import {
    InputBox,
    Switch,
    SwitchBox,
    SwitchOption,
    Wrapper,
    Buttons,
    Button
} from './components';
import {useAccount, useBalance, useContractRead, useContractWrite, useNetwork} from "wagmi";
import {CHAIN_INFO, IMultiClaimAbi, IWethAbi} from "@/const";
import {NOTIFICATION_TYPE} from "@/features/notifications";
import {parseUnits} from "viem";

type Props = {
    onClose: VoidFunction;
};

enum ACTION {
    WRAP = 'WRAP',
    UNWRAP = 'UNWRAP'
}

const OPTIONS: [SwitchOption, SwitchOption] = [
  {label: 'Wrap VC', value: ACTION.WRAP},
  {label: 'Unwrap wVC', value: ACTION.UNWRAP}
]

export function WrapModal({onClose}: Props) {
    const {address} = useAccount()
    const {chain} = useNetwork()
    const {data: nativeBalance} = useBalance({address: address, watch: true})
    const {data: wrappedBalance} = useContractRead({
        abi: IWethAbi,
        address: CHAIN_INFO[chain?.id!].WETH,
        functionName: 'balanceOf',
        args: [address],
        watch: true
    })

    //region CONTRACT WRITES
    const {
        data: dataWrap,
        isLoading: isLoadingWrap,
        isSuccess: isSuccessWrap,
        write: writeWrap
    } = useContractWrite({
        abi: IWethAbi,
        functionName: 'deposit',
        address: CHAIN_INFO[chain?.id!].WETH,
        onSuccess: sentTxResult => {
            // send wrap tx: sentTxResult.hash
        }
    })

    const {
        data: dataUnwrap,
        isLoading: isLoadingUnwrap,
        isSuccess: isSuccessUnwrap,
        write: writeUnwrap
    } = useContractWrite({
        abi: IWethAbi,
        functionName: 'withdraw',
        address: CHAIN_INFO[chain?.id!].WETH,
        onSuccess: sentTxResult => {
            // send unwrap tx: sentTxResult.hash
        }
    })
    //endregion

    const [value, setValue] = useState('')
    const [option, setOption] = useState(OPTIONS[0].value)

    const onInputChange = (val: string) => {
        setValue(val);
    };

    const write = () => {
        if (option == ACTION.WRAP) {
            // wrapping
            writeWrap({
                value: parseUnits(value.toString(10), 18)
            })
        } else {
            // unwrapping
            writeUnwrap({
                value: parseUnits(value.toString(10), 18)
            })
        }
    }

    const onMax = () => {
        if(option === ACTION.WRAP){
            setValue(nativeBalance?.value.toString() ?? '0')
        }

        setValue(wrappedBalance ?? '0')
    }

    const isLoading = isLoadingWrap || isLoadingUnwrap;
    const canContinue = parseFloat(value) > 0

    return (
        <ModalBase title={'Wrap VC/Unwrap wVC'} onClose={onClose}>
            <Wrapper>
                <SwitchBox>
                    <Switch options={OPTIONS} value={option} onChange={setOption}/>
                </SwitchBox>
                <InputBox>
                    <CurrencyInput
                      value={value}
                      onChange={onInputChange} onMax={onMax}
                      ticker={option === ACTION.WRAP ? 'VC' : 'wVC'}
                      maxText={'SET MAX'}
                    />
                </InputBox>
                <Buttons>
                    <Button preset={BUTTON_PRESET.PINK} loading={isLoading} disabled={!canContinue} onClick={write}>
                        {option === ACTION.WRAP ? 'Wrap' : 'Unwrap'}
                    </Button>
                </Buttons>
            </Wrapper>
        </ModalBase>
    );
}
