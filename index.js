const bitflyer = require('./bitflyer');

const main = async () => {
    const result = await bitflyer.assetBalance()
    console.log(JSON.parse(result))
}

main()