import * as _request from 'request';

export const request = <ParsedType>(opts: _request.CoreOptions & _request.RequiredUriUrl): Promise<ParsedType> => {
    return new Promise((resolve, reject) => {
        _request.default(opts, (err: any, _: _request.Response, body: any) => {
            if (err) {
                reject(err)
            } else {
                try {
                    resolve(JSON.parse(body) as ParsedType)
                } catch (e) {
                    reject(e)
                }
            }
      })
    })
}

