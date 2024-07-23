export default function (amount: any, decimalCount = 2, decimalFlag = '.', thousandFlag = ',') {
    try {
        decimalCount = Math.abs(decimalCount)
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount
        const negativeSign = amount < 0 ? '-' : ''
        const i: any = parseInt((amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))).toString()
        const j: any = i.length > 3 ? i.length % 3 : 0
        return ('$' +
            negativeSign +
            (j ? i.substr(0, j) + thousandFlag : '') +
            i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${thousandFlag}`) +
            (decimalCount
                ? decimalFlag +
                Math.abs(amount - i)
                    .toFixed(decimalCount)
                    .slice(2)
                : '')
        )
    } catch (e) {
        console.log(e)
    }
}