import { createGlobalStyle } from 'styled-components';

import 'simplebar-react/dist/simplebar.min.css';

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  
  html {
    font-size: 62.5%;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
  
  *[role=button] {
    cursor: pointer;
  }
  
  svg {
    display: block;
  }
`;
