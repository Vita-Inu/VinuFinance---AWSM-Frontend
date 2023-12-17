import {Wrapper, Text} from './styled';

type Props = {
    symbol: string;
};

export function CurrencyBadge({symbol}: Props) {
    return (
        <Wrapper>
            <Text>{symbol}</Text>
        </Wrapper>
    );
}
