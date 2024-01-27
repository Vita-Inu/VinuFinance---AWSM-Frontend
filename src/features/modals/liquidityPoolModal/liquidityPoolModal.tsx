import {useState} from 'react';
import {Button, BUTTON_PRESET} from '@/components/buttons';
import {ModalBase} from '../modalBase';

const humanizeDuration = require("humanize-duration");
import {Buttons, Cell, Describe, Grid, Label, Value, NumberInput, TextInput, RangeSlider, DelegateButton, ExpandButton, DelegateText} from './components';
import {PoolWithInfo, Rewards} from "@/features/liquidityProviders";
import { formatUnits, isAddress, parseUnits } from 'viem';
import {Explain} from "@/components/table";
import {res} from "pino-std-serializers";

type Props = {
    pool: PoolWithInfo;
    isLoadingRewards: boolean;
    shouldDisableButtons: boolean;
    rewards: Rewards;
    onClose: VoidFunction;
    onClickClaim: (reinvested: boolean) => void;
    onClickWithdraw: (val: bigint) => void;
    onClickDelegate: (val: `0x${string}`) => void;
    onClickUndelegate: () => void;
    onClickDeposit: (val: bigint) => void;
    currentDelegatedAddress: `0x${string}` | undefined;
};

export function LiquidityPoolModal({onClose, pool, onClickWithdraw, onClickDeposit, isLoadingRewards, rewards, onClickClaim, shouldDisableButtons, onClickUndelegate, onClickDelegate, }: Props) {
    const [inputVal, setInputVal] = useState('');
    const [range, setRange] = useState(100);

    const [delegateAddress, setDelegateAddress] = useState('')
    const [showDelegate, setShowDelegate] = useState(false)
    // const delegatedAddress = "0xa54A41B6eAF70F5E058a1e4542524DC88944e8C4"
    const delegatedAddress = null

    const onInputChange = (val: string) => {
        setInputVal(val);
    };

    let lpShares = BigInt(0)
    if (pool.lpInfo[3].length != 0) {
        lpShares = pool.lpInfo[3].slice(-1)[0];
    }

    let providedAmount = 0;
    if (lpShares != BigInt(0)) {
        providedAmount = parseFloat(formatUnits(pool.pool.info[5] / (pool.pool.info[6] / lpShares), pool.loanCurrency.decimals));
    }

    const formatRewards = () => {
        let result = ''
        if (rewards.loanRewards != 0) {
            result += rewards.loanRewards.toFixed(4) + ' $' + pool.loanCurrency.symbol
        }
        if (rewards.collRewards != 0) {
            if (result !== '') {
                result += ' and '
            }
            result += rewards.collRewards.toFixed(4) + ' $' + pool.collCurrency.symbol
        }
        if (result === '') {
            return 'None'
        }
        return result
    }

    const lockSeconds = pool.lpInfo[1] - (Date.now() / 1000)
    const lockText = lockSeconds > 0 ? humanizeDuration(lockSeconds * 1000) : null
    const isPositiveValue = parseFloat(inputVal) > 0
    const isDelegateAddressValid = isAddress(delegateAddress)

    return (
        <ModalBase title={'Pool details'} onClose={onClose}>
            <Grid>
                <Cell>
                    <Label>Loan Tenor</Label>
                    <Value>{humanizeDuration(1000 * parseInt(pool.pool.info[4].toString()))}</Value>
                </Cell>
                <Cell>
                    <Label>Max. Loan Per Collateral Unit</Label>
                    <Value>{formatUnits(pool.pool.info[2], pool.loanCurrency.decimals)} {pool.loanCurrency.symbol}</Value>
                    <Explain>$0.0</Explain>
                </Cell>
                <Cell>
                    <Label>Total Liquidity</Label>
                    <Value>{parseFloat(formatUnits(pool.pool.info[5], pool.loanCurrency.decimals)).toFixed(2)} {pool.loanCurrency.symbol}</Value>
                    <Explain>$0.0</Explain>
                </Cell>
                <Cell>
                    <Label>Current APR</Label>
                    <Value>{(1 + (pool.currentMonthlyApr * 12).toFixed(2))}%</Value>
                    <Explain>~{(Math.pow(1 + pool.currentMonthlyApr, 12) * 100 - 100).toFixed(2)}% APY</Explain>
                </Cell>
                <Cell>
                    <Label>Rewards</Label>
                    {!isLoadingRewards &&
                        <Value>{formatRewards()}</Value>
                    }
                    {isLoadingRewards &&
                        <Value>Loading..</Value>
                    }
                </Cell>
                <Cell/>
                <Cell>
                    <Button
                        fullWidth
                        preset={BUTTON_PRESET.PINK}
                        loading={isLoadingRewards}
                        disabled={(rewards.collRewards + rewards.loanRewards) === 0 || shouldDisableButtons}
                        onClick={() => onClickClaim(false)}
                    >
                        Claim
                    </Button>
                </Cell>
                <Cell>
                    <Button
                        fullWidth
                        preset={BUTTON_PRESET.PINK}
                        loading={isLoadingRewards}
                        disabled={(rewards.collRewards + rewards.loanRewards) === 0 || shouldDisableButtons}
                        onClick={() => onClickClaim(true)}
                    >
                        Claim and reinvest
                    </Button>
                </Cell>
                <Cell>
                    <NumberInput
                        value={inputVal}
                        onChange={onInputChange}
                        onMax={() => onInputChange(pool.loanCurrency.balance.toString())}
                        ticker={pool.loanCurrency.symbol}
                    />
                </Cell>
                <Cell>
                    <RangeSlider value={range} maxAmount={providedAmount} loanCurrency={pool.loanCurrency}
                                 onChange={setRange}/>
                </Cell>
                <Cell>
                    <Button
                        fullWidth
                        preset={BUTTON_PRESET.PURPLE}
                        onClick={() => onClickDeposit(parseUnits(inputVal.toString(), pool.loanCurrency.decimals))}
                        disabled={shouldDisableButtons || !isPositiveValue}
                    >
                        Deposit
                    </Button>
                </Cell>
                <Cell>
                    <Button
                        fullWidth
                        preset={BUTTON_PRESET.PURPLE}
                        onClick={() => onClickWithdraw(lpShares * BigInt(range * 10000) / BigInt(1000000))}
                        disabled={providedAmount == 0 || shouldDisableButtons || !!lockText}
                    >
                        {lockText && `Unlocks in ${lockText}`}
                        {!lockText && `Withdraw`}
                    </Button>
                </Cell>
                <Cell $wide>
                    <ExpandButton expanded={showDelegate} onClick={() => setShowDelegate((prev) => !prev)}>Emergency withdrawal delegation</ExpandButton>
                </Cell>
                {showDelegate && !delegatedAddress && (
                    <>
                        <Cell>
                            <TextInput value={delegateAddress} onChange={setDelegateAddress}/>
                        </Cell>
                        <Cell>
                            <DelegateButton>
                                <Button
                                  preset={BUTTON_PRESET.PINK}
                                  loading={false}
                                  disabled={!delegateAddress.length || !isDelegateAddressValid}
                                  onClick={() => onClickDelegate(delegateAddress)}
                                >
                                    Delegate
                                </Button>
                            </DelegateButton>
                        </Cell>
                    </>
                )}
                {showDelegate && !!delegatedAddress && (
                    <>
                        <Cell>
                            <DelegateText>
                                Delegating to <span>{delegatedAddress}</span>
                            </DelegateText>
                        </Cell>
                        <Cell>
                            <DelegateButton>
                                <Button
                                  preset={BUTTON_PRESET.PINK}
                                  loading={false}
                                  onClick={() => onClickUndelegate}
                                >
                                    Undelegate
                                </Button>
                            </DelegateButton>
                        </Cell>
                    </>
                )}
            </Grid>
        </ModalBase>
    );
}
