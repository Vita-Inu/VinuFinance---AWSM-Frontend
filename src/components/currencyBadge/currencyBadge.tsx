import { CURRENCY, CurrencyMap } from '@/utils/currency';

import { Wrapper, Text, Bubble } from './styled';

type Props = {
  currency: CURRENCY;
};

export function CurrencyBadge({ currency }: Props) {
  const matched = CurrencyMap.get(currency);

  if (!matched) return null;

  return (
    <Wrapper>
      <Bubble src={matched.img} alt={'currency'} width={24} height={24} />
      <Text>{matched.title}</Text>
    </Wrapper>
  );
}
