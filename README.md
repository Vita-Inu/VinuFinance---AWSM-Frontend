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

## Deployment

TBD

## Conventions

### Project structure

//TODO:: Remake since we will drop `app` feature...

```
- public
- src
  - components # Shared UI components with no logic
  - features # Shared component which use multiple UI components or have any kind of logic.
    - components # UI Components made for this single feature
  - app
    - page.tsx # Index page
    - borrow
      - components # UI components which are related only to Borrow page
      - features # Components which have some logic related only to Borrow page
      - page.tsx # Borrow page
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
