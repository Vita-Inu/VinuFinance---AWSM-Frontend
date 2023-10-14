import { RefObject, useState } from 'react';

export const useDropdown = (ref: RefObject<HTMLDivElement>) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const showDropdown = () => setIsVisible(true);

  const hideDropdown = () => setIsVisible(false);

  const toggleDropdown = () => setIsVisible((prev) => !prev);

  const eventHandler = (evt: MouseEvent) => {
    if (!ref.current) return;

    const clickedEl = evt.target as Node;

    if (ref.current.contains(clickedEl)) return;

    hideDropdown();
  };

  return {
    isVisible,
    showDropdown,
    hideDropdown,
    toggleDropdown,
    eventHandler,
  };
};
