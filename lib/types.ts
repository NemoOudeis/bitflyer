
export interface Balance {
    currency_code: string,
    amount: number,
    available: number
}

/** @see https://lightning.bitflyer.com/docs?lang=en#market-list */
export interface Market {
    product_code: string,
    alias?: string
}

/** @see https://lightning.bitflyer.com/docs?lang=en#order-book */
export interface Board {
    mid_price: number,
    bids: any[]
}

/** @see https://lightning.bitflyer.com/docs?lang=en#chat */
export interface Chat {
    nickname: string,
    message: string,
    date: string
}

/** @see https://lightning.bitflyer.com/docs?lang=en#ticker */
export interface Ticker {
    product_code: string,
    timestamp: string,
    tick_id: number,
    best_bid: number,
    best_ask: number,
    best_bid_size: number,
    best_ask_size: number,
    total_bid_depth: number,
    total_ask_depth: number,
    ltp: number,
    volume: number,
    volume_by_product: number
}

/** @see https://lightning.bitflyer.com/docs?lang=en#execution-history */
export interface Execution {
    id: number,
    side: string,
    price: number,
    size: number,
    exec_date: string,
    buy_child_order_acceptance_id: string,
    sell_child_order_acceptance_id: string
}

/** @see https://lightning.bitflyer.com/docs?lang=en#exchange-status */
export interface Health {
    status: String
}