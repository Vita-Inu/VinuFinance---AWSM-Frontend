# VinuFinance Dapp

## Stack
- nextjs
- typescript
- styled-components
- wagmi


## Development

### Install dependencies

```bash
npm install
```

### Running the application

```bash
npm run dev
```

## Conventions

### Project structure

```
- public
- src
  - components # Shared UI components with no business logic
    - component
      - styled.tsx # Place to keep styled components.
      - index.tsx # Everything what goes outside of feature scope should be exported from index file.
  - features # Shared component which use multiple UI components or have any kind of business logic.
    - feature
      - components # UI Components made for this single feature
        - component
        - styled.tsx
      - styled.tsx # Styled components can be kept near main component or inside "components" folder.
      - hooks
      - types
      - index.tsx # Everything what goes outside of feature scope should be exported from index file.
  - pages # We are using `nextjs` pages router
```

### Naming

### Folders & files

For folder or file naming we use `camelCase` e.g. `table/tableRow.tsx`

### Enums & constants

Enums and fixed value constants musts uppercase `SNAKE_CASE` e.g.:

```
enum WALLET {
    METAMASK = "METAMASK"
    COINBASE = "COINBASE"
}

const WALLET_PREFIX = "0x"
```
