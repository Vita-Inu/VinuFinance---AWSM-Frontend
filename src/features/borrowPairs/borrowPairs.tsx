import {useState} from 'react';

import {Pairs} from './styled';
import {Pair} from './components';
import {PairType} from "@/features/borrow";

type Props = {
    pairs: PairType[];
    onIdSelect: Function;
    selectedId: number;
};

export function BorrowPairs({pairs, onIdSelect, selectedId}: Props) {
    const [toggle, setToggle] = useState(false);

    return (
        <Pairs>
            {pairs.map((pair, index) => {
                console.log(pair)
                return <Pair
                    key={index}
                    names={[pair.loanName, pair.collName]}
                    addresses={[pair.loanAddress, pair.collAddress]}
                    onClick={onIdSelect}
                    active={index == selectedId}
                    id={index}
                ></Pair>
            })}
        </Pairs>
    );
}
