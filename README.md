# TypeScript Bindings for [BitFlyer Lightning API](https://lightning.bitflyer.com/docs?lang=en)

Get started quickly with scripting BitFlyer's API.

**Step 1**: Install package

```shell
yarn add bitflyer-api
npm i bitflyer-api
```

**Step 2**: Connect to the BitFlyer API 🎉

```typescript
// index.ts
import { Bitflyer } from 'bitflyer-api';

const credentials = { // get your credentials here https://lightning.bitflyer.com/developer
    key: "my key",
    secret: "my secret"
}

const bitflyer = new Bitflyer(credentials)

const allPublic = async () => {
    const health = await bitflyer.getHealth()
    console.log(health)
}
```

## Functions & Types

| Function                      | BitFlyer Lightning API                                                                    |
| ----------------------------- | ----------------------------------------------------------------------------------------- |
| `bitflyer.getHealth()`        | [`GET /v1/gethealth`](https://lightning.bitflyer.com/docs?lang=en#exchange-status)        |
| `bitflyer.markets()`          | [`GET /v1/markets`](https://lightning.bitflyer.com/docs?lang=en#market-list)              |
| `bitflyer.getMarkets()`       | [`GET /v1/getmarkets`](https://lightning.bitflyer.com/docs?lang=en#market-list)           |
| `bitflyer.board()`            | [`GET /v1/board`](https://lightning.bitflyer.com/docs?lang=en#order-book)                 |
| `bitflyer.getBoard()`         | [`GET /v1/getboard`](https://lightning.bitflyer.com/docs?lang=en#order-book)              |
| `bitflyer.ticker()`           | [`GET /v1/ticker`](https://lightning.bitflyer.com/docs?lang=en#ticker)                    |
| `bitflyer.getTicker()`        | [`GET /v1/getticker`](https://lightning.bitflyer.com/docs?lang=en#ticker)                 |
| `bitflyer.executions()`       | [`GET /v1/executions`](https://lightning.bitflyer.com/docs?lang=en#execution-history)     |
| `bitflyer.getExecutions()`    | [`GET /v1/getexecutions`](https://lightning.bitflyer.com/docs?lang=en#execution-history)  |
| `bitflyer.getChats()`         | [`GET /v1/getchats`](https://lightning.bitflyer.com/docs?lang=en#chat)                    |
