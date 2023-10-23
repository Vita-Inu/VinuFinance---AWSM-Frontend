import Image from 'next/image';

import { useWindowResize } from '@/hooks';

import LogoIcon from './assets/logo.svg';

const DESKTOP_SIZE = { width: 170, height: 30 };

const MOBILE_SIZE = { width: 135, height: 24 };

export function Logo() {
  const { isMobileSize } = useWindowResize();

  return (
    <Image
      src={LogoIcon}
      width={isMobileSize ? MOBILE_SIZE.width : DESKTOP_SIZE.width}
      height={isMobileSize ? MOBILE_SIZE.height : DESKTOP_SIZE.height}
      alt={'Logo'}
    />
  );
}
