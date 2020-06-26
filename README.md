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

| Function                          | BitFlyer Lightning API                                                                                                |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `bitflyer.getHealth()`            | [`GET /v1/gethealth`](https://lightning.bitflyer.com/docs?lang=en#exchange-status)                                    |
| `bitflyer.markets()`              | [`GET /v1/markets`](https://lightning.bitflyer.com/docs?lang=en#market-list)                                          |
| `bitflyer.getMarkets()`           | [`GET /v1/getmarkets`](https://lightning.bitflyer.com/docs?lang=en#market-list)                                       |
| `bitflyer.board()`                | [`GET /v1/board`](https://lightning.bitflyer.com/docs?lang=en#order-book)                                             |
| `bitflyer.getBoard()`             | [`GET /v1/getboard`](https://lightning.bitflyer.com/docs?lang=en#order-book)                                          |
| `bitflyer.ticker()`               | [`GET /v1/ticker`](https://lightning.bitflyer.com/docs?lang=en#ticker)                                                |
| `bitflyer.getTicker()`            | [`GET /v1/getticker`](https://lightning.bitflyer.com/docs?lang=en#ticker)                                             |
| `bitflyer.executions()`           | [`GET /v1/executions`](https://lightning.bitflyer.com/docs?lang=en#execution-history)                                 |
| `bitflyer.getExecutions()`        | [`GET /v1/getexecutions`](https://lightning.bitflyer.com/docs?lang=en#execution-history)                              |
| `bitflyer.getChats()`             | [`GET /v1/getchats`](https://lightning.bitflyer.com/docs?lang=en#chat)                                                |
| `bitflyer.getHealth()`            | [`GET /v1/gethealth`](https://lightning.bitflyer.com/docs?lang=en#exchange-status)                                    |
| `bitflyer.getPermissions()`       | [`GET /v1/me/getpermissions`](https://lightning.bitflyer.com/docs?lang=en#get-api-key-permissions)                    |
| `bitflyer.getBalance()`           | [`GET /v1/me/getbalance`](https://lightning.bitflyer.com/docs?lang=en#get-account-asset-balance)                      |
| `bitflyer.getCollateral()`        | [`GET /v1/me/getcollateral`](https://lightning.bitflyer.com/docs?lang=en#get-margin-status)                           |
| `bitflyer.getAddresses()`         | [`GET /v1/me/getaddresses`](https://lightning.bitflyer.com/docs?lang=en#get-crypto-assets-deposit-addresses)          |
| `bitflyer.getCoinIns()`           | [`GET /v1/me/getcoinins`](https://lightning.bitflyer.com/docs?lang=en#get-crypto-assets-deposit-addresses)            |
| `bitflyer.getCoinOuts()`          | [`GET /v1/me/getcoinouts`](https://lightning.bitflyer.com/docs?lang=en#get-crypto-assets-transaction-history)         |
| `bitflyer.getDeposits()`          | [`GET /v1/me/getdeposits`](https://lightning.bitflyer.com/docs?lang=en#get-cash-deposits)                             |
| `bitflyer.getBankAccounts()`      | [`GET /v1/me/getbankaccounts`](https://lightning.bitflyer.com/docs?lang=en#get-summary-of-bank-accounts)              |
| `bitflyer.withdraw()`             | [`POST /v1/me/withdraw`](https://lightning.bitflyer.com/docs?lang=en#withdrawing-funds)                               |
| `bitflyer.getWithdrawals()`       | [`GET /v1/me/getwithdrawals`](https://lightning.bitflyer.com/docs?lang=en#get-deposit-cancellation-history)           |
| `bitflyer.sendChildOrder()`       | [`POST /v1/me/sendchildorder`](https://lightning.bitflyer.com/docs?lang=en#send-a-new-order)                          |
| `bitflyer.cancelChildOrder()`     | [`POST /v1/me/cancelchildorder`](https://lightning.bitflyer.com/docs?lang=en#cancel-order)                            |
| `bitflyer.sendParentOrder()`      | [`POST /v1/me/sendparentorder`](https://lightning.bitflyer.com/docs?lang=en#submit-new-parent-order-special-order)    |
| `bitflyer.cancelParentOrder()`    | [`POST /v1/me/cancelparentorder`](https://lightning.bitflyer.com/docs?lang=en#cancel-parent-order)                    |
| `bitflyer.cancelAllChildOrders()` | [`POST /v1/me/cancelallchildorders`](https://lightning.bitflyer.com/docs?lang=en#cancel-all-orders)                   |
| `bitflyer.getChildOrders()`       | [`GET /v1/me/getchildorders`](https://lightning.bitflyer.com/docs?lang=en#list-orders)                                |
| `bitflyer.getParentOrder()`       | [`GET /v1/me/getparentorder`](https://lightning.bitflyer.com/docs?lang=en#get-parent-order-details)                   |
| `bitflyer.getParentOrders()`      | [`GET /v1/me/getparentorders`](https://lightning.bitflyer.com/docs?lang=en#list-parent-orders)                        |
| `bitflyer.getMyExecutions()`      | [`GET /v1/me/getexecutions`](https://lightning.bitflyer.com/docs?lang=en#list-executions)                             |
