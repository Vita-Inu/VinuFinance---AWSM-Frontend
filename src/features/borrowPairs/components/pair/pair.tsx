import {Box, Text, Bubbles, Bubble} from './styled';

type Props = {
    names: [string, string];
    addresses: [string, string];
    onClick: Function;
    active: boolean;
    id: number;
};

export function Pair({names, addresses, active, onClick, id}: Props) {
    // todo: use addresses to get icon urls from IconsMap and render proper bubbles
    return (
        <Box $active={active} role={'button'} onClick={() => onClick(id)}>
            <Bubbles>
                <Bubble/>
                <Bubble/>
            </Bubbles>
            <Text>
                Borrow <span>{names[0]}</span> against <span>{names[1]}</span>
            </Text>
        </Box>
    );
}
