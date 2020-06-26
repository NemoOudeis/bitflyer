import { request as http } from './asyncRequest';
import {
    Health,
    Market,
    Board,
    Ticker,
    Execution,
    Chat,
    Balance,
    Collateral,
    Address,
    CoinIn,
    CoinOut,
    BankAccount,
    Deposit,
    WithdrawRequest,
    WithdrawResponse,
    Withdrawal,
    ChildOrderResponse,
    ChildOrderRequest,
    ParentOrderRequest,
    ParentOrderResponse,
    CancelChildOrderRequest,
    CancelParentOrderRequest,
    ParentOrder,
    ChildOrder,
    ListChildOrdersRequest,
    ParentOrderDetail,
    OrderStatus,
    MyExecution,
} from './types';
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

    private request = <T>(method: HttpMethod, path: string, urlParams: any = {}, body?: any): Promise<T> =>
        http(requestBuilder(this.credentials, method, path, urlParams, body));

    // Public APIs

    /** @see https://lightning.bitflyer.com/docs?lang=en#market-list */
    markets(region = ''): Promise<Market[]> {
        return this.request(HttpMethod.Get, `/v1/markets/${region}`);
    }

    /** @see https://lightning.bitflyer.com/docs?lang=en#market-list */
    getMarkets(region = ''): Promise<Market[]> {
        return this.request(HttpMethod.Get, `/v1/getmarkets/${region}`);
    }

    /** @see https://lightning.bitflyer.com/docs?lang=en#order-book */
    board(product_code?: string): Promise<Board> {
        return this.request(HttpMethod.Get, `/v1/board`, { product_code });
    }

    /** @see https://lightning.bitflyer.com/docs?lang=en#order-book */
    getBoard(product_code?: string): Promise<Board> {
        return this.request(HttpMethod.Get, '/v1/getboard', { product_code });
    }

    /** @see https://lightning.bitflyer.com/docs?lang=en#ticker */
    ticker(product_code?: string): Promise<Ticker> {
        return this.request(HttpMethod.Get, '/v1/ticker', { product_code });
    }

    /** @see https://lightning.bitflyer.com/docs?lang=en#ticker */
    getTicker(product_code?: string): Promise<Ticker> {
        return this.request(HttpMethod.Get, '/v1/getticker', { product_code });
    }

    /** @see https://lightning.bitflyer.com/docs?lang=en#execution-history */
    executions(product_code?: string, pagination?: Pagination): Promise<Execution[]> {
        return this.request(HttpMethod.Get, '/v1/executions', { product_code, ...(pagination || {}) });
    }

    /** @see https://lightning.bitflyer.com/docs?lang=en#execution-history */
    getExecutions(product_code?: string, pagination?: Pagination): Promise<Execution[]> {
        return this.request(HttpMethod.Get, '/v1/getexecutions', { product_code, ...(pagination || {}) });
    }

    /** @see https://lightning.bitflyer.com/docs?lang=en#chat */
    getChats(region = '', from_date?: string): Promise<Chat[]> {
        return this.request(HttpMethod.Get, `/v1/getchats/${region}`, { from_date });
    }

    /** @see https://lightning.bitflyer.com/docs?lang=en#exchange-status */
    getHealth(product_code?: string): Promise<Health> {
        return this.request(HttpMethod.Get, '/v1/gethealth', { product_code });
    }

    // Private APIs

    /** @see https://lightning.bitflyer.com/docs?lang=en#get-api-key-permissions */
    getPermissions(): Promise<string[]> {
        return this.request(HttpMethod.Get, '/v1/me/getpermissions');
    }

    /** @see https://lightning.bitflyer.com/docs?lang=en#get-account-asset-balance */
    getBalance(): Promise<Balance[]> {
        return this.request(HttpMethod.Get, '/v1/me/getbalance');
    }

    /** @see https://lightning.bitflyer.com/docs?lang=en#get-margin-status */
    getCollateral(): Promise<Collateral> {
        return this.request(HttpMethod.Get, '/v1/me/getcollateral');
    }

    /** @see https://lightning.bitflyer.com/docs?lang=en#get-crypto-assets-deposit-addresses */
    getAddresses(): Promise<Address[]> {
        return this.request(HttpMethod.Get, '/v1/me/getaddresses');
    }

    /** @see https://lightning.bitflyer.com/docs?lang=en#get-crypto-assets-deposit-addresses */
    getCoinIns(pagination: Pagination = {}): Promise<CoinIn[]> {
        return this.request(HttpMethod.Get, '/v1/me/getcoinins', pagination);
    }

    /** @see https://lightning.bitflyer.com/docs?lang=en#get-crypto-assets-transaction-history */
    getCoinOuts(pagination: Pagination = {}): Promise<CoinOut[]> {
        return this.request(HttpMethod.Get, '/v1/me/getcoinouts', pagination);
    }

    /** @see https://lightning.bitflyer.com/docs?lang=en#get-summary-of-bank-accounts */
    getBankAccounts(): Promise<BankAccount[]> {
        return this.request(HttpMethod.Get, '/v1/me/getbankaccounts');
    }

    /** @see https://lightning.bitflyer.com/docs?lang=en#get-cash-deposits */
    getDeposits(pagination: Pagination = {}): Promise<Deposit[]> {
        return this.request(HttpMethod.Get, '/v1/me/getdeposits', pagination);
    }

    /** @see https://lightning.bitflyer.com/docs?lang=en#withdrawing-funds */
    withdraw(withdrawRequest: WithdrawRequest): Promise<WithdrawResponse> {
        return this.request(HttpMethod.Post, '/v1/me/withdraw', {}, withdrawRequest);
    }

    /** @see https://lightning.bitflyer.com/docs?lang=en#get-deposit-cancellation-history */
    getWithdrawals(pagination?: Pagination): Promise<Withdrawal> {
        return this.request(HttpMethod.Get, '/v1/me/getwithdrawals', pagination);
    }

    /** @see https://lightning.bitflyer.com/docs?lang=en#send-a-new-order */
    sendChildOrder(orderRequest: ChildOrderRequest): Promise<ChildOrderResponse> {
        return this.request(HttpMethod.Post, '/v1/me/sendchildorder', {}, orderRequest);
    }

    /** @see https://lightning.bitflyer.com/docs?lang=en#cancel-order */
    cancelChildOrder(cancelRequest: CancelChildOrderRequest): Promise<void> {
        return this.request(HttpMethod.Post, '/v1/me/cancelchildorder', {}, cancelRequest);
    }

    /** @see https://lightning.bitflyer.com/docs?lang=en#submit-new-parent-order-special-order */
    sendParentOrder(orderRequest: ParentOrderRequest): Promise<ParentOrderResponse> {
        return this.request(HttpMethod.Post, '/v1/me/sendparentorder', {}, orderRequest);
    }

    /** @see https://lightning.bitflyer.com/docs?lang=en#cancel-parent-order */
    cancelParentOrder(cancelRequest: CancelParentOrderRequest): Promise<void> {
        return this.request(HttpMethod.Post, '/v1/me/cancelparentorder', {}, cancelRequest);
    }

    /** @see https://lightning.bitflyer.com/docs?lang=en#cancel-all-orders */
    cancelAllChildOrders(product_code: string): Promise<void> {
        return this.request(HttpMethod.Post, '/v1/me/cancelallchildorders', {}, { product_code });
    }

    /** @see https://lightning.bitflyer.com/docs?lang=en#list-orders */
    getChildOrders(listRequest: ListChildOrdersRequest, pagination: Pagination = {}): Promise<ChildOrder[]> {
        return this.request(HttpMethod.Get, '/v1/me/getchildorders', { ...listRequest, ...pagination });
    }

    /** @see https://lightning.bitflyer.com/docs?lang=en#get-parent-order-details */
    getParentOrder(
        parentOrderId: { parent_order_id: string } | { parent_order_acceptance_id: string },
    ): Promise<ParentOrderDetail> {
        return this.request(HttpMethod.Get, '/v1/me/getparentorder', parentOrderId);
    }

    /** @see https://lightning.bitflyer.com/docs?lang=en#list-parent-orders */
    getParentOrders(
        product_code: string,
        child_order_state?: OrderStatus,
        pagination: Pagination = {},
    ): Promise<ParentOrder[]> {
        return this.request(HttpMethod.Get, '/v1/me/getparentorders', {
            product_code,
            child_order_state,
            ...pagination,
        });
    }

    /** @see https://lightning.bitflyer.com/docs?lang=en#list-executions */
    getMyExecutions(
        product_code: string,
        child_order_id?: string,
        child_order_acceptance_id?: string,
        pagination: Pagination = {},
    ): Promise<MyExecution[]> {
        return this.request(HttpMethod.Get, '/v1/me/getexecutions', {
            product_code,
            child_order_id,
            child_order_acceptance_id,
            ...pagination,
        });
    }

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

    // orders = (): Promise<any[]> => http(this.request(HttpMethod.Get, '/v1/me/getchildorders'));
}
