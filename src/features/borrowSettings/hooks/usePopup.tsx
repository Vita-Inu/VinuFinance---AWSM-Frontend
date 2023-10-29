import { RefObject, useEffect, useState } from 'react';

import { useWindowResize } from '@/hooks';

export const usePopup = (ref: RefObject<HTMLDivElement>) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const { isTabletSize } = useWindowResize();

  const showPopup = () => {
    setIsVisible(true);

    if (isTabletSize) {
      document.body.style.overflow = 'hidden';
    }
  };

  const hidePopup = () => {
    setIsVisible(false);
    document.body.style.overflow = '';
  };

  const togglePopup = () => {
    if (isVisible) {
      hidePopup();
      return;
    }

    showPopup();
  };

  useEffect(() => {
    if (isTabletSize) return;

    const eventHandler = (evt: MouseEvent) => {
      if (!ref.current) return;

      const clickedEl = evt.target as Node;

      if (ref.current.contains(clickedEl)) return;

      hidePopup();
    };

    document.addEventListener('mouseup', eventHandler);

    return () => {
      document.removeEventListener('mouseup', eventHandler);
    };
  }, [isTabletSize, ref]);

  const anchor = isTabletSize ? document.querySelector('main') : ref.current;

  return { showPopup, hidePopup, togglePopup, isVisible, anchor };
};
