import { useState } from 'react';

export const useDropdown = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const showDropdown = () => setIsVisible(true);
  const hideDropdown = () => setIsVisible(false);

  return { isVisible, showDropdown, hideDropdown };
};
