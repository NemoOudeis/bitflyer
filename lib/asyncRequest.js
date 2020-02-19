const request = require('request');

const asyncRequest = (opts) => {
    return new Promise((resolve, reject) => {
        request(opts, (err, resp, body) => {
            if (err) {
                reject(err)
            } else {
                resolve(body)
            }
      })
    })
}

module.exports = asyncRequest