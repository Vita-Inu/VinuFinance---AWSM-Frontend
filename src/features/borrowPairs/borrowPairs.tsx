import {useState} from 'react';

import {Pairs} from './styled';
import {Pair} from './components';

type Props = {
    pairs: object[];
    onIdSelect: Function;
    selectedId: number;
};

export function BorrowPairs({pairs, onIdSelect, selectedId}: Props) {
    const [toggle, setToggle] = useState(false);

    return (
        <Pairs>
            {pairs.map((pair, index) => {
                return <Pair
                    key={index}
                    pairs={[pair.loanName, pair.collName]}
                    onClick={onIdSelect}
                    active={index == selectedId}
                    id={index}
                ></Pair>
            })}
        </Pairs>
    );
}
