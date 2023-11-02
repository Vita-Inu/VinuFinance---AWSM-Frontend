import {Button as DefaultButton, BUTTON_PRESET} from '@/components/buttons';

import {Wrapper} from './styled';
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

type Props = {
    borrowedAmnt: number;
    borrowedToken: string;
    collateralAmnt: number;
    collateralToken: string;
    enabled: boolean;
    loading: boolean;
    error: string;
    onclick: VoidFunction;
    needsApproval: boolean;
}

export function Button(props: Props) {
    let displayText = ''
    if (props.needsApproval) {
        displayText = `Approve ${props.collateralAmnt.toFixed(3)} ${props.collateralToken}`
    } else {
        displayText = `Borrow ${props.borrowedAmnt.toFixed(3)} ${props.borrowedToken} for ${props.collateralAmnt.toFixed(3)} ${props.collateralToken}`
    }
    return (
        <Wrapper>
            {!props.enabled && !props.loading &&
                <DefaultButton preset={BUTTON_PRESET.PINK} disabled={true}>
                    {props.error == undefined && 'Invalid parameters'}
                    {props.error !== '' ? props.error : 'Invalid parameters'}
                </DefaultButton>
            }
            {props.enabled && !props.loading &&
                <DefaultButton onClick={props.onclick} preset={BUTTON_PRESET.WHITE}>
                    {displayText}
                </DefaultButton>
            }
            {props.loading &&
                // todo: make this like a spinner thing or other
                <DefaultButton disabled={true}>
                    Loading...
                </DefaultButton>
            }
        </Wrapper>
    );
}
