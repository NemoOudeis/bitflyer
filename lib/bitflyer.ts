import {request as http} from './asyncRequest';
import * as crypto from 'crypto';
import {Health, Market, Board, Ticker, Execution, Chat, Balance} from './types';

interface Credentials {
    secret: string,
    key: string
}

interface Pagination {
    count?: number,
    before?: string,
    after?: string
}

export class BitFlyer {
    private credentials: Credentials

    constructor(credentials: Credentials) {
        this.credentials = credentials;
    }

    private request = (method: string, path: string, urlParams: any = {}, body?: any) => {
        const timestamp = Date.now().toString();
        const jsonBody = body ? JSON.stringify(body) : ''
        const query = Object.entries(urlParams).map(it => `${it[0]}=${it[1]}`).join('&')
        const pathAndQuery = `${path}${query ? '?' : ''}${query}`
    
        const text = timestamp + method + pathAndQuery + jsonBody;
        const sign = crypto.createHmac('sha256', this.credentials.secret).update(text).digest('hex');
    
        return {
            url: `https://api.bitflyer.com${pathAndQuery}`,
            method: method,
            headers: {
                'ACCESS-KEY': this.credentials.key,
                'ACCESS-TIMESTAMP': timestamp,
                'ACCESS-SIGN': sign,
                'Content-Type': 'application/json'
            },
            body: jsonBody
        }
    }

    // Public APIs

    /** @see https://lightning.bitflyer.com/docs?lang=en#market-list */
    markets(region: string = ''): Promise<Market[]> {
        return http(this.request('GET', `/v1/markets/${region}`))
    }
    /** @see https://lightning.bitflyer.com/docs?lang=en#market-list */
    getMarkets(region: string = ''): Promise<Market[]> {
        return http(this.request('GET', `/v1/getmarkets/${region}`))
    } 
    /** @see https://lightning.bitflyer.com/docs?lang=en#order-book */
    board(product_code?: string): Promise<Board> {
        return http(this.request('GET', `/v1/board`, { product_code }))
    }
    /** @see https://lightning.bitflyer.com/docs?lang=en#order-book */
    getBoard(product_code?: string): Promise<Board> {
        return http(this.request('GET', '/v1/getboard', { product_code }))
    }
    /** @see https://lightning.bitflyer.com/docs?lang=en#ticker */
    ticker(product_code?: string): Promise<Ticker> {
        return http(this.request('GET', '/v1/ticker', { product_code }))
    }
    /** @see https://lightning.bitflyer.com/docs?lang=en#ticker */
    getTicker(product_code?: string): Promise<Ticker> {
        return http(this.request('GET', '/v1/ticker', { product_code }))
    }
    /** @see https://lightning.bitflyer.com/docs?lang=en#execution-history */
    executions(product_code?: string, pagination?: Pagination): Promise<Execution[]> {
        return http(this.request('GET', '/v1/ticker', { product_code, ...(pagination || {}) }))
    }
    /** @see https://lightning.bitflyer.com/docs?lang=en#execution-history */
    getExecutions(product_code?: string, pagination?: Pagination): Promise<Execution[]> {
        return http(this.request('GET', '/v1/ticker', { product_code, ...(pagination || {}) }))
    }
    /** @see https://lightning.bitflyer.com/docs?lang=en#chat */
    getChats(region: string = '', from_date?: string): Promise<Chat[]> {
        return http(this.request('GET', `/v1/getchats/${region}`, {from_date}))
    }
    /** @see https://lightning.bitflyer.com/docs?lang=en#exchange-status */
    getHealth(product_code?: string): Promise<Health> {
        return http(this.request('GET', '/v1/gethealth', { product_code }))
    }

    // Private APIs


    // buyBtc = (price, amount, side = 'BUY', type = 'LIMIT') => {
    //     const opts = this.request('POST', '/v1/me/sendchildorder', {
    //         product_code: 'BTC_JPY',
    //         child_order_type: type,
    //         side: side,
    //         price: price,
    //         size: amount
    //     })
    
    //     return http(opts)
    // }

    marginStatus = () => http(this.request('GET', '/v1/me/getcollateral'))
    permissions = () => http(this.request('GET', '/v1/me/getpermissions'))

    balance = (): Promise<Balance[]> => http(this.request('GET', '/v1/me/getbalance'))
    orders = (): Promise<any[]> => http(this.request('GET', '/v1/me/getchildorders'))

    
}