// import { BitFlyer } from './jslib';
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
    const health = await bitflyer.getHealth()
    console.log(health)
    const markets = await bitflyer.markets()
    console.log(markets)
    const board = await bitflyer.board()
    console.log(board)
    const ticker = await bitflyer.ticker()
    console.log(ticker)
    const executions = await bitflyer.executions()
    console.log(executions)

    // await bitflyer.getHealth()
    // await bitflyer.markets()
    // await bitflyer.getMarkets()
    // await bitflyer.board()
    // await bitflyer.getBoard()
    // await bitflyer.ticker()
    // await bitflyer.getTicker()
    // await bitflyer.executions()
    // await bitflyer.getExecutions()
    // await bitflyer.getChats()
}

allPublic()
