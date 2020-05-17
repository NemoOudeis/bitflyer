import {request as http} from './asyncRequest';
import * as crypto from 'crypto';
import * as credentials from '../credentials.json';

const request = (method: string, path: string, body?: any) => {
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

export const buyBtc = (price, amount, side = 'BUY', type = 'LIMIT') => {
    const opts = request('POST', '/v1/me/sendchildorder', {
        product_code: 'BTC_JPY',
        child_order_type: type,
        side: side,
        price: price,
        size: amount
    })

    return http(opts)
}

export const marginStatus = () => http(request('GET', '/v1/me/getcollateral'))
export const permissions = () => http(request('GET', '/v1/me/getpermissions'))

interface Balance {
    currency_code: string,
    amount: number,
    available: number
}

export const balance = (): Promise<Balance[]> => http(request('GET', '/v1/me/getbalance'))
export const orders = (): Promise<any[]> => http(request('GET', '/v1/me/getchildorders'))
export const executions = () => http(request('GET', '/v1/me/getexecutions'))
export const markets = () => http(request('GET', '/v1/markets'))

interface Board {
    mid_price: number,
    bids: any[]
}

export const board = (board: string): Promise<Board> => http(request('GET', `/v1/board?product_code=${board}`))
