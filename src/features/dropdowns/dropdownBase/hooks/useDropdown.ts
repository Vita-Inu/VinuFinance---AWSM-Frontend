import { RefObject, useEffect, useState } from 'react';

import { useWindowResize } from '@/hooks';

export const useDropdown = (ref: RefObject<HTMLDivElement>) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const { isTabletSize } = useWindowResize();

  const showDropdown = () => setIsVisible(true);
  const hideDropdown = () => setIsVisible(false);

  const toggleDropdown = () => setIsVisible((prev) => !prev);

  useEffect(() => {
    if (isTabletSize) return;

    const eventHandler = (evt: MouseEvent) => {
      if (!ref.current) return;

      const clickedEl = evt.target as Node;

      if (ref.current.contains(clickedEl)) return;

      hideDropdown();
    };

    document.addEventListener('mouseup', eventHandler);

    return () => {
      document.removeEventListener('mouseup', eventHandler);
    };
  }, [isTabletSize, ref]);

  const anchor = isTabletSize ? document.querySelector('main') : ref.current;

  return {
    isVisible,
    showDropdown,
    hideDropdown,
    toggleDropdown,
    anchor,
  };
};
