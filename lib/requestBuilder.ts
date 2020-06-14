/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as crypto from 'crypto';
import { CoreOptions, UrlOptions } from 'request';

export interface Credentials {
    secret: string;
    key: string;
}

// I know there are more HTTP methodes, the BitFlyer API
// however chose not to use them, so we don't need them here.
export enum HttpMethod {
    Get = 'GET',
    Post = 'POST',
}

export const requestBuilder = (
    credentials: Credentials,
    method: HttpMethod,
    path: string,
    urlParams: any = {},
    body?: any,
): CoreOptions & UrlOptions => {
    const timestamp = Date.now().toString();
    const jsonBody = body ? JSON.stringify(body) : '';
    const query = Object.entries(urlParams)
        .filter((it) => !!it[1])
        .map((it) => `${it[0]}=${it[1]}`)
        .join('&');
    const pathAndQuery = `${path}${query ? '?' : ''}${query}`;

    const text = timestamp + method + pathAndQuery + jsonBody;
    const sign = crypto.createHmac('sha256', credentials.secret).update(text).digest('hex');

    return {
        url: `https://api.bitflyer.com${pathAndQuery}`,
        method: method,
        headers: {
            'ACCESS-KEY': credentials.key,
            'ACCESS-TIMESTAMP': timestamp,
            'ACCESS-SIGN': sign,
            'Content-Type': 'application/json',
        },
        body: jsonBody,
    };
};
