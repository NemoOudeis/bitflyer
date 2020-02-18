const request = require('./asyncRequest');
const crypto = require('crypto');
const credentials = require('./credentials')

const bitflyer = (method, path, body) => {
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
    const opts = bitflyer('POST', '/v1/me/sendchildorder', {
        product_code: 'BTC_JPY',
        child_order_type: 'LIMIT',
        side: 'BUY',
        price: price,
        size: amount
    })

    return request(opts)
}

const assetBalance = () => {
    const opts = bitflyer('GET', '/v1/me/getbalance')
    return request(opts)
}

module.exports = {
    bitflyer,
    buyBtc,
    assetBalance
}