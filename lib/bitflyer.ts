import { request as http } from './asyncRequest';
import { Health, Market, Board, Ticker, Execution, Chat, Balance } from './types';
import { requestBuilder, Credentials, HttpMethod } from './requestBuilder';

export interface Pagination {
    count?: number;
    before?: string;
    after?: string;
}

export class BitFlyer {
    private credentials: Credentials;

    constructor(credentials: Credentials) {
        this.credentials = credentials;
    }

    private request = (method: HttpMethod, path: string, urlParams: any = {}, body?: any) =>
        requestBuilder(this.credentials, method, path, urlParams, body);

    // Public APIs

    /** @see https://lightning.bitflyer.com/docs?lang=en#market-list */
    markets(region = ''): Promise<Market[]> {
        return http(this.request(HttpMethod.Get, `/v1/markets/${region}`));
    }
    /** @see https://lightning.bitflyer.com/docs?lang=en#market-list */
    getMarkets(region = ''): Promise<Market[]> {
        return http(this.request(HttpMethod.Get, `/v1/getmarkets/${region}`));
    }
    /** @see https://lightning.bitflyer.com/docs?lang=en#order-book */
    board(product_code?: string): Promise<Board> {
        return http(this.request(HttpMethod.Get, `/v1/board`, { product_code }));
    }
    /** @see https://lightning.bitflyer.com/docs?lang=en#order-book */
    getBoard(product_code?: string): Promise<Board> {
        return http(this.request(HttpMethod.Get, '/v1/getboard', { product_code }));
    }
    /** @see https://lightning.bitflyer.com/docs?lang=en#ticker */
    ticker(product_code?: string): Promise<Ticker> {
        return http(this.request(HttpMethod.Get, '/v1/ticker', { product_code }));
    }
    /** @see https://lightning.bitflyer.com/docs?lang=en#ticker */
    getTicker(product_code?: string): Promise<Ticker> {
        return http(this.request(HttpMethod.Get, '/v1/getticker', { product_code }));
    }
    /** @see https://lightning.bitflyer.com/docs?lang=en#execution-history */
    executions(product_code?: string, pagination?: Pagination): Promise<Execution[]> {
        return http(this.request(HttpMethod.Get, '/v1/executions', { product_code, ...(pagination || {}) }));
    }
    /** @see https://lightning.bitflyer.com/docs?lang=en#execution-history */
    getExecutions(product_code?: string, pagination?: Pagination): Promise<Execution[]> {
        return http(this.request(HttpMethod.Get, '/v1/getexecutions', { product_code, ...(pagination || {}) }));
    }
    /** @see https://lightning.bitflyer.com/docs?lang=en#chat */
    getChats(region = '', from_date?: string): Promise<Chat[]> {
        return http(this.request(HttpMethod.Get, `/v1/getchats/${region}`, { from_date }));
    }
    /** @see https://lightning.bitflyer.com/docs?lang=en#exchange-status */
    getHealth(product_code?: string): Promise<Health> {
        return http(this.request(HttpMethod.Get, '/v1/gethealth', { product_code }));
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

    // marginStatus = () => http(this.request('GET', '/v1/me/getcollateral'))
    // permissions = () => http(this.request('GET', '/v1/me/getpermissions'))

    balance = (): Promise<Balance[]> => http(this.request(HttpMethod.Get, '/v1/me/getbalance'));
    orders = (): Promise<any[]> => http(this.request(HttpMethod.Get, '/v1/me/getchildorders'));
}
