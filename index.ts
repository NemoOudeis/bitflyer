import * as bitflyer from'./lib/bitflyer';
import * as fs from './lib/fsUtil';

const map = {
    id: 'id',
    price: 'price',
    child_order_id: 'child_order_id',
    average_price: 'average_price',
    size: 'size',
    child_order_state: 'status',
    child_order_date: 'date',
    total_commission: 'fee'
}

const filterObject = (object, map) => {
    const keys = Object.keys(map)
    return Object.keys(object)
        .filter(key => keys.includes(key))
        .reduce((obj, key) => {
            obj[map[key]] = object[key]
            return obj;
        }, {});
}

const loadOrders = async () => {
    const orders = await bitflyer.orders()
    const buys = orders.filter(o => o.side === 'BUY').map(o => filterObject(o, map))
    const sells = orders.filter(o => o.side === 'SELL').map(o => filterObject(o, map))

    await fs.mkdir('orders')
    await fs.writeYamlFile('orders/buys.yaml', buys)
    await fs.writeYamlFile('orders/sells.yaml', sells)
}

const main2 = async () => {
    const positions = await fs.readYamlFile('positions.yaml')

    const buys = await fs.readYamlFile('orders/buys.yaml')
    const sells = await fs.readYamlFile('orders/sells.yaml')

    buys.forEach(b => {
        const price = Math.max(b.price, b.average_price)
        delete b.average_price
        b.price = price
    })

    sells.forEach(b => {
        const price = Math.max(b.price, b.average_price)
        delete b.average_price
        b.price = price
    })

    const p = positions[1]
    const open = buys.find(b => b.id == p.open)
    const close = sells.filter(s => [p.close].flat().includes(s.id))
    console.log(`open  ${open.size} at ${open.price}`)
    close.forEach(c => {
        console.log(`close ${c.size} at ${c.price}`)
    })

    console.log(`ROI = ${close[0].price / open.price}`)
}

const main = async () => {
    const board = await bitflyer.board('BTC_JPY')
    console.log(board.mid_price)
    // e.g. 5000 yen
    const amount = 5000 / board.mid_price
    console.log(amount)
    const balance = await bitflyer.balance()
    console.log(balance)
    const jpy = balance.find(it => it.currency_code == 'JPY')
    if(jpy) {
        console.log(jpy.available)
    }
}

main()