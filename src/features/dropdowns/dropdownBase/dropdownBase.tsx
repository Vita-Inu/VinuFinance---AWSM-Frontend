import { ReactNode, useEffect, useRef } from 'react';

import { Wrapper, Button, Dropdown } from './components';
import { useDropdown } from './hooks';

type Props = {
  button: ReactNode;
  dropdown: ReactNode;
};

export function DropdownBase({ button, dropdown }: Props) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { eventHandler, isVisible, toggleDropdown } = useDropdown(dropdownRef);

  useEffect(() => {
    document.addEventListener('mouseup', eventHandler);

    return () => {
      document.removeEventListener('mouseup', eventHandler);
    };
  }, [eventHandler]);

  return (
    <Wrapper ref={dropdownRef}>
      <Button onClick={toggleDropdown} role={'button'}>
        {button}
      </Button>
      <Dropdown $visible={isVisible}>{dropdown}</Dropdown>
    </Wrapper>
  );
}
