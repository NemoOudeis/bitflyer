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

export enum ChildOrderType {
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
export interface ChildOrderRequest {
    product_code: string;
    child_order_type: ChildOrderType;
    side: OrderSide;
    size: number;
    price?: number;
    minute_to_expire?: number;
    time_in_force?: OrderTimeInForce;
}

export interface ChildOrderResponse {
    child_order_acceptance_id: string;
}

/** @see https://lightning.bitflyer.com/docs?lang=en#cancel-order */
export type CancelChildOrderRequest = CancelChildOrderByIdRequest | CancelChildOrderByAcceptanceIdRequest;

export interface CancelChildOrderByIdRequest {
    product_code: string;
    child_order_id: string;
}
export interface CancelChildOrderByAcceptanceIdRequest {
    product_code: string;
    child_order_acceptance_id: string;
}

export enum ParentOrderMethod {
    SIMPLE = 'SIMPLE',
    IFD = 'IFD',
    OCO = 'OCO',
    IFDOCO = 'IFDOCO',
}

export enum ParentOrderType {
    Limit = 'LIMIT',
    Market = 'MARKET',
    Stop = 'STOP',
    StopLimit = 'STOP_LIMIT',
    Trail = 'TRAIL',
}

/** @see https://lightning.bitflyer.com/docs?lang=en#submit-new-parent-order-special-order */
export interface ParentOrderParameter {
    product_code: string;
    condition_type: ParentOrderType;
    side: OrderSide;
    size: number;
    price?: number;
    trigger_price?: number;
    offset?: number;
}

export interface ParentOrderRequest {
    order_method: ParentOrderMethod;
    minute_to_expire?: number;
    time_in_force?: OrderTimeInForce;
    parameters: ParentOrderParameter[];
}

export interface ParentOrderResponse {
    parent_order_acceptance_id: string;
}

/** @see https://lightning.bitflyer.com/docs?lang=en#cancel-parent-order */
export type CancelParentOrderRequest = CancelParentOrderByAcceptanceIdRequest | CancelParentOrderByIdRequest;

export interface CancelParentOrderByIdRequest {
    product_code: string;
    parent_order_id: string;
}
export interface CancelParentOrderByAcceptanceIdRequest {
    product_code: string;
    parent_order_acceptance_id: string;
}

export enum OrderStatus {
    Active = 'ACTIVE',
    Completed = 'COMPLETED',
    Canceld = 'CANCELED',
    Expired = 'EXPIRED',
    Rejected = 'REJECTED',
}

/** @see https://lightning.bitflyer.com/docs?lang=en#list-orders */
export interface ListChildOrdersRequest {
    product_code: string;
    child_order_state?: OrderStatus;
    child_order_id?: string;
    child_order_acceptance_id?: string;
    parent_order_id?: string;
}

export interface ChildOrder {
    id: number;
    child_order_id: string;
    product_code: string;
    side: OrderSide;
    child_order_type: ChildOrderType;
    price: number;
    average_price: number;
    size: number;
    child_order_state: OrderStatus;
    expire_date: string;
    child_order_date: string;
    child_order_acceptance_id: string;
    outstanding_size: number;
    cancel_size: number;
    executed_size: number;
    total_commission: number;
}

/** @see https://lightning.bitflyer.com/docs?lang=en#get-parent-order-details */
export interface ParentOrderDetail {
    id: number;
    parent_order_id: string;
    order_method: ParentOrderMethod;
    expire_date: number;
    parent_order_acceptance_id: string;
    parameters: ParentOrderParameter[];
}

/** @see https://lightning.bitflyer.com/docs?lang=en#list-parent-orders */
export interface ParentOrder {
    id: number;
    parent_order_id: string;
    product_code: string;
    side: OrderSide;
    parent_order_type: ParentOrderType;
    price: number;
    average_price: number;
    size: number;
    parent_order_state: OrderStatus;
    expire_date: string;
    parent_order_date: string;
    parent_order_acceptance_id: string;
    outstanding_size: number;
    cancel_size: number;
    executed_size: number;
    total_commission: number;
}

/** @see https://lightning.bitflyer.com/docs?lang=en#list-executions */
export interface MyExecution {
    id: number;
    child_order_id: string;
    side: OrderSide;
    price: number;
    size: number;
    commission: number;
    exec_date: string;
    child_order_acceptance_id: string;
}
