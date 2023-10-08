import { useState } from 'react';

import { Pairs } from './styled';
import { Pair } from './components';

export function BorrowPairs() {
  const [toggle, setToggle] = useState(false);

  return (
    <Pairs>
      <Pair
        active={toggle}
        pairs={['rETH', 'RPL']}
        onClick={() => setToggle((prevState) => !prevState)}
      />
      <Pair
        active={toggle}
        pairs={['DAI', 'gOHM']}
        onClick={() => setToggle((prevState) => !prevState)}
      />
      <Pair
        active={toggle}
        pairs={['USDC', 'RPL']}
        onClick={() => setToggle((prevState) => !prevState)}
      />
    </Pairs>
  );
}
