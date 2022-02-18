const moneyFormatter = (value) => {
    value = parseFloat(value);
    return value.toFixed(2)
}

export {
    moneyFormatter
}