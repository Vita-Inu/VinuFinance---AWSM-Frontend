import { ForwardedRef, forwardRef, ReactNode } from 'react';

import { Wrapper, Button, Dropdown } from './components';

type Props = {
  button: ReactNode;
  onButtonClick: VoidFunction;
  onClose: VoidFunction;
  dropdown: ReactNode;
  dropdownAnchor: HTMLElement | null;
  dropdownVisible?: boolean;
};

function DropdownBaseContainer(
  {
    button,
    onButtonClick,
    onClose,
    dropdown,
    dropdownVisible,
    dropdownAnchor,
  }: Props,
  dropdownRef: ForwardedRef<HTMLDivElement>,
) {
  return (
    <Wrapper ref={dropdownRef}>
      <Button onClick={onButtonClick} role={'button'}>
        {button}
      </Button>
      <Dropdown
        visible={dropdownVisible}
        anchor={dropdownAnchor}
        onClose={onClose}
      >
        {dropdown}
      </Dropdown>
    </Wrapper>
  );
}

export const DropdownBase = forwardRef(DropdownBaseContainer);
