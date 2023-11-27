import {IconsMap} from '@/utils/currency';

import {Wrapper, Text, Bubble} from './styled';

type Props = {
    address: string;
    name: string;
};

export function CurrencyBadge({address, name}: Props) {
    const matched = IconsMap.get(address);

    if (!matched) return null;

    return (
        <Wrapper>
            <Bubble src={matched} alt={'currency'} width={24} height={24}/>
            <Text>{name}</Text>
        </Wrapper>
    );
}
