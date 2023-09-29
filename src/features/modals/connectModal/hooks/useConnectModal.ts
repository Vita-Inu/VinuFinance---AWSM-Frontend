import { ChangeEvent, useState } from 'react';

const DEFAULT_AGREEMENTS_STATE = {
  country: false,
  policy: false,
  vpn: false,
};

export const useConnectModal = () => {
  const [agreements, setAgreements] = useState<typeof DEFAULT_AGREEMENTS_STATE>(
    DEFAULT_AGREEMENTS_STATE,
  );

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
