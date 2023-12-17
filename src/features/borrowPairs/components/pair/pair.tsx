import {Box, Text} from './styled';

type Props = {
    names: [string, string];
    addresses: [string, string];
    onClick: Function;
    active: boolean;
    id: number;
};

export function Pair({names, addresses, active, onClick, id}: Props) {
    return (
        <Box $active={active} role={'button'} onClick={() => onClick(id)}>
            <Text>
                Borrow <span>{names[0]}</span> against <span>{names[1]}</span>
            </Text>
        </Box>
    );
}
