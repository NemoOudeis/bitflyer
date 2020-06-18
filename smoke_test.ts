// import { BitFlyer } from './dist';
import { BitFlyer } from './index';

import * as credentials from './credentials.json';

const bitflyer = new BitFlyer(credentials)

// const main = async () => {
//     const board = await bitflyer.board('BTC_JPY')
//     console.log(board.mid_price)
//     // e.g. 5000 yen
//     const amount = 5000 / board.mid_price
//     console.log(amount)
//     const balance = await bitflyer.balance()
//     console.log(balance)
//     const jpy = balance.find(it => it.currency_code == 'JPY')
//     if(jpy) {
//         console.log(jpy.available)
//     }
// }

const allPublic = async () => {
    // console.log(await bitflyer.getHealth())
    // console.log(await bitflyer.markets())
    // console.log(await bitflyer.board())
    // console.log(await bitflyer.ticker())
    // console.log(await bitflyer.executions())
    // console.log(await bitflyer.getPermissions())
    // console.log(await bitflyer.getBalance())
    // console.log(await bitflyer.getCollateral())
    // console.log(await bitflyer.getAddresses())
    // console.log(await bitflyer.getCoinIns())
    // console.log(await bitflyer.getCoinOuts())
    // console.log(await bitflyer.getBankAccounts())
    // console.log(await bitflyer.getDeposits())
    console.log(await bitflyer.getWithdrawals())
}

allPublic()
