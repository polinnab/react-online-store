import { BAD_REQUEST_MESSAGE, DEFAULT_ERROR_MESSAGE, INTERNAL_SERVER_ERROR_MESSAGE, UNATHORIZED_ERROR_MESSAGE } from "./_constans";

export const moneyFormatter = (value) => {
    value = parseFloat(value);
    return value.toFixed(2)
}

export const ErrorRequestHandler = (response) => {
    const {status, data: {message}} = response;
    console.log('mesage: ', message)
    switch(status) {
        case 400: 
            return message ? message : BAD_REQUEST_MESSAGE
        case 401:
            return message ? message : UNATHORIZED_ERROR_MESSAGE
        case 500:
            return INTERNAL_SERVER_ERROR_MESSAGE
        default:
            return DEFAULT_ERROR_MESSAGE
    }
}
