import Image from 'next/image';

import LogoIcon from './assets/logo.svg';

export function Logo() {
  return <Image src={LogoIcon} width={170} height={30} alt={'Logo'} />;
}
