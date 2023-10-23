import { useEffect, useState } from 'react';

type WindowSize = {
  width: number;
  height: number;
};

export const useWindowResize = () => {
  const [size, setSize] = useState<WindowSize>({ height: 0, width: 0 });

  useEffect(() => {
    const updateWindowSize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', updateWindowSize);

    return () => {
      window.removeEventListener('resize', updateWindowSize);
    };
  }, []);

  return {
    width: size.width,
    height: size.height,
    isMobileSize: size.width <= 767,
  };
};
