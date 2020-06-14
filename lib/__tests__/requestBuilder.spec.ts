import { requestBuilder, HttpMethod } from '../requestBuilder';

const credentials = {
    secret: 'test-secrect',
    key: 'test-key',
};

test('should attach bitflyer auth headers', () => {
    const request = requestBuilder(credentials, HttpMethod.Get, '/some/path');

    expect(request.headers).not.toBeNull();
    expect(request.headers).toHaveProperty('ACCESS-KEY');
    expect(request.headers).toHaveProperty('ACCESS-TIMESTAMP');
    expect(request.headers).toHaveProperty('ACCESS-SIGN');
});

test('should not attach url parameters with null values', () => {
    const request = requestBuilder(credentials, HttpMethod.Get, '/some/path', { urlParamKey: null });

    expect(request.url).toEqual(expect.not.stringContaining('?'));
    expect(request.url).toEqual(expect.not.stringContaining('urlParamKey'));
});

test('should not attach url parameters with undefined values', () => {
    const request = requestBuilder(credentials, HttpMethod.Get, '/some/path', { urlParamKey: undefined });

    expect(request.url).toEqual(expect.not.stringContaining('?'));
    expect(request.url).toEqual(expect.not.stringContaining('urlParamKey'));
});

test('should not attach url parameters for empty param object', () => {
    const request = requestBuilder(credentials, HttpMethod.Get, '/some/path', {});

    expect(request.url).toEqual(expect.not.stringContaining('?'));
    expect(request.url).toEqual(expect.not.stringContaining('='));
});

test('should not attach null as body', () => {
    const request = requestBuilder(credentials, HttpMethod.Get, '/some/path', {}, null);

    expect(request.body).not.toBeNull();
});
