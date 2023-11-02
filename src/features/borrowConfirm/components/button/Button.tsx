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
    error: string;
    onclick: VoidFunction;
}

export function Button(props: Props) {
    return (
        <Wrapper>
            {!props.enabled &&
                <DefaultButton preset={BUTTON_PRESET.PINK} disabled={true}>
                    {props.error == undefined && 'Invalid parameters'}
                    {props.error !== '' ? props.error : 'Invalid parameters'}
                </DefaultButton>
            }
            {props.enabled &&
                <DefaultButton onClick={props.onclick} preset={BUTTON_PRESET.WHITE}>
                    Borrow {props.borrowedAmnt.toFixed(3)} {props.borrowedToken} for {props.collateralAmnt.toFixed(3)} {props.collateralToken}
                </DefaultButton>
            }
        </Wrapper>
    );
}
