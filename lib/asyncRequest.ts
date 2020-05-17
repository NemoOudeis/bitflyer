import * as orignialRequest from 'request';

export const request = <ParsedType>(opts): Promise<ParsedType> => {
    return new Promise((resolve, reject) => {
        orignialRequest(opts, (err, _, body) => {
            if (err) {
                reject(err)
            } else {
                resolve(JSON.parse(body) as ParsedType)
            }
      })
    })
}

