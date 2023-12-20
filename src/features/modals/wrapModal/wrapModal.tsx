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

const OPTIONS: [SwitchOption, SwitchOption] = [{label: 'Wrap VC', value: 'WRAP'}, {
    label: 'Unwrap wVC',
    value: 'UNWRAP'
}]

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

    // TODO: disable buttons while this is true
    const isLoading = isLoadingWrap || isLoadingUnwrap;

    // TODO: call this function upon button press
    const write = () => {
        if (option == 'WRAP') {
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

    return (
        <ModalBase title={'Pool details'} onClose={onClose}>
            <Wrapper>
                <SwitchBox>
                    <Switch options={OPTIONS} value={option} onChange={setOption}/>
                </SwitchBox>
                <InputBox>
                    {
                        // TODO: the 'ticker' should be 'VC' if the user wants to *wrap* and 'wVC' if the user wants to *unwrap*
                        // TODO: the onMax function should setValue to 'nativeBalance' if the user wants to *wrap* and 'wrappedBalance' if the user wants to *wrap*
                    }
                    <CurrencyInput value={value} onChange={onInputChange} onMax={() => setValue(1000)} ticker={'VC'}
                                   maxText={'SET MAX'}/>
                </InputBox>
                <Buttons>
                    {
                        // TODO: this button should say wrap or unwrap depending on the switch
                    }
                    <Button preset={BUTTON_PRESET.PINK}>Save</Button>
                </Buttons>
            </Wrapper>
        </ModalBase>
    );
}
