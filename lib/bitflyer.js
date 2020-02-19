const http = require('./asyncRequest');
const crypto = require('crypto');
const credentials = require('../credentials')

const request = (method, path, body) => {
    const timestamp = Date.now().toString();
    const jsonBody = body ? JSON.stringify(body) : ''

    const text = timestamp + method + path + jsonBody;
    const sign = crypto.createHmac('sha256', credentials.secret).update(text).digest('hex');

    return {
        url: `https://api.bitflyer.com${path}`,
        method: method,
        headers: {
            'ACCESS-KEY': credentials.key,
            'ACCESS-TIMESTAMP': timestamp,
            'ACCESS-SIGN': sign,
            'Content-Type': 'application/json'
        },
        body: jsonBody
    }
}

const buyBtc = (price, amount) => {
    const opts = request('POST', '/v1/me/sendchildorder', {
        product_code: 'BTC_JPY',
        child_order_type: 'LIMIT',
        side: 'BUY',
        price: price,
        size: amount
    })

    return http(opts)
}

const marginStatus = () => http(request('GET', '/v1/me/getcollateral'))
const permissions = () => http(request('GET', '/v1/me/getpermissions'))
const assets = () => http(request('GET', '/v1/me/getbalance'))
const orders = () => http(request('GET', '/v1/me/getchildorders'))
const executions = () => http(request('GET', '/v1/me/getexecutions'))



module.exports = {
    buyBtc,
    assets,
    marginStatus,
    permissions,
    orders,
    executions
}