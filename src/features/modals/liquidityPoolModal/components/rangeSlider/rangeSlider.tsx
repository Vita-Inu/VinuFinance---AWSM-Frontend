import {
    Slider,
    Box,
    Wrapper,
    Label,
    Value,
    Bubble,
} from './rangeSlider.styled';

type Props = {
    value: number;
    onChange: (val: number) => void;
    loanCurrency: {
        decimals: number;
        symbol: string;
        balance: number;
    };
    maxAmount: number;
};

export function RangeSlider({onChange, value, loanCurrency, maxAmount}: Props) {
    return (
        <Wrapper>
            <Value>
                <Label>Withdraw</Label>
                <Bubble>{value}% ({(value / 100 * maxAmount).toFixed(4)} ${loanCurrency.symbol})</Bubble>
            </Value>
            <Box>
                <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={value}
                    disabled={maxAmount == 0}
                    onChange={(val) => onChange(Array.isArray(val) ? val[0] : val)}
                />
            </Box>
        </Wrapper>
    );
}
