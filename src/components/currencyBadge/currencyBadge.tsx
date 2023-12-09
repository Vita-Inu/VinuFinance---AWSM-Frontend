import {IconsMap} from '@/utils/currency';

import {Wrapper, Text, Bubble} from './styled';

type Props = {
    address: string;
    name: string;
};

export function CurrencyBadge({address, name}: Props) {
    const matched = IconsMap.get(address);

    return (
        <Wrapper>
            {matched &&
                <Bubble src={matched} alt={'currency'} width={24} height={24}/>
            }
            {!matched &&
                // TODO: display like a question mark image or whatever
                <></>
            }
            <Text>{name}</Text>
        </Wrapper>
    );
}
