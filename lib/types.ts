export interface Balance {
    currency_code: string;
    amount: number;
    available: number;
}

/** @see https://lightning.bitflyer.com/docs?lang=en#market-list */
export interface Market {
    product_code: string;
    alias?: string;
}

/** @see https://lightning.bitflyer.com/docs?lang=en#order-book */
export interface Board {
    mid_price: number;
    bids: any[];
}

/** @see https://lightning.bitflyer.com/docs?lang=en#chat */
export interface Chat {
    nickname: string;
    message: string;
    date: string;
}

/** @see https://lightning.bitflyer.com/docs?lang=en#ticker */
export interface Ticker {
    product_code: string;
    timestamp: string;
    tick_id: number;
    best_bid: number;
    best_ask: number;
    best_bid_size: number;
    best_ask_size: number;
    total_bid_depth: number;
    total_ask_depth: number;
    ltp: number;
    volume: number;
    volume_by_product: number;
}

/** @see https://lightning.bitflyer.com/docs?lang=en#execution-history */
export interface Execution {
    id: number;
    side: string;
    price: number;
    size: number;
    exec_date: string;
    buy_child_order_acceptance_id: string;
    sell_child_order_acceptance_id: string;
}

/** @see https://lightning.bitflyer.com/docs?lang=en#exchange-status */
export interface Health {
    status: string;
}

/** @see https://lightning.bitflyer.com/docs?lang=en#get-margin-status */
export interface Collateral {
    collateral: number;
    open_position_pnl: number;
    require_collateral: number;
    keep_rate: number;
}

/** @see https://lightning.bitflyer.com/docs?lang=en#get-crypto-assets-deposit-addresses */
export interface Address {
    type: string;
    currency_code: string;
    address: string;
}

export enum TransactionStatus {
    Pending = 'PENDING',
    Completed = 'COMPLETED',
}

interface Transaction {
    id: number;
    order_id: string;
    currency_code: string;
    amount: number;
    status: TransactionStatus;
    event_date: string;
}

interface CoinTransaction extends Transaction {
    address: string;
    tx_hash: string;
}

/** @see https://lightning.bitflyer.com/docs?lang=en#get-crypto-assets-deposit-history */
export type CoinIn = CoinTransaction;

/** @see https://lightning.bitflyer.com/docs?lang=en#get-crypto-assets-transaction-history */
export interface CoinOut extends CoinTransaction {
    fee: number;
    additional_fee: number;
}

/** @see https://lightning.bitflyer.com/docs?lang=en#get-summary-of-bank-accounts */
export interface BankAccount {
    id: number;
    is_verified: boolean;
    bank_name: string;
    branch_name: string;
    account_type: string;
    account_number: string;
    account_name: string;
}

/** @see https://lightning.bitflyer.com/docs?lang=en#get-cash-deposits */
export type Deposit = Transaction;

/** @see https://lightning.bitflyer.com/docs?lang=en#withdrawing-funds */
export interface WithdrawRequest {
    currency_code: string;
    bank_account_id: number;
    amount: number;
}

/** @see https://lightning.bitflyer.com/docs?lang=en#withdrawing-funds */
export interface WithdrawResponse {
    message_id: string;
}

/** @see https://lightning.bitflyer.com/docs?lang=en#get-deposit-cancellation-history */
export type Withdrawal = Transaction;

export enum OrderType {
    Limit = 'LIMIT',
    Market = 'MARKET',
}

export enum OrderSide {
    Buy = 'BUY',
    Sell = 'SELL',
}

export enum OrderTimeInForce {
    GTC = 'GTC',
    FOK = 'FOK',
    IOC = 'IOC',
}

/** @see https://lightning.bitflyer.com/docs?lang=en#send-a-new-order */
export interface OrderRequest {
    product_code: string;
    child_order_type: OrderType;
    side: OrderSide;
    price?: number;
    size: number;
    minute_to_expire: number;
    time_in_force: OrderTimeInForce;
}

export interface ChildOrderResponse {
    child_order_acceptance_id: string;
}
