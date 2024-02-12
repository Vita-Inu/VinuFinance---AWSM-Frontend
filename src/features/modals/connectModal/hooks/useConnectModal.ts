import { ChangeEvent, useEffect, useState } from 'react';

import { agreementsConfirmed } from '@/utils';

const DEFAULT_AGREEMENTS_STATE = {
  country: false,
  policy: false,
  vpn: false,
};

export const useConnectModal = () => {
  const [agreements, setAgreements] = useState<typeof DEFAULT_AGREEMENTS_STATE>(
    DEFAULT_AGREEMENTS_STATE,
  );

  useEffect(() => {
    const allConfirmed = agreementsConfirmed()

    if(!allConfirmed) return

    setAgreements({country: true, vpn: true, policy: true})
  }, [])

  const canLogin = Object.values(agreements).every((val) => val);

  const handleAgreementChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setAgreements((prevState) => {
      if (!Object.keys(agreements).includes(evt.target.name)) return prevState;

      return {
        ...prevState,
        [evt.target.name]: evt.target.checked,
      };
    });
  };

  return { canLogin, agreements, handleAgreementChange };
};
