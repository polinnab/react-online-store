// ----- requests -----
export const LOCAL_HOST = process.env.REACT_APP_LOCAL_HOST + ':';
export const PORT = process.env.REACT_APP_SERVER_PORT || 5001;
export const IMAGE_URL = LOCAL_HOST + PORT + '/upload/';
export const API_URL = LOCAL_HOST + PORT + '/api';

// ----- routes -----
export const admin_route = '/admin'
export const user_route = '/account'
export const login_route = '/login'
export const registration_route = '/registration'
export const main_route = '/'
export const product_route = '/product'
export const products_route = '/catalogue'
export const basket_route = '/basket'
export const cart_route = '/cart'
export const shop_route = '/shop-account'

// ----- errors -----
export const BAD_REQUEST_MESSAGE = 'Bad request from server';
export const UNATHORIZED_ERROR_MESSAGE = '401 - Unauthorized';
export const DEFAULT_ERROR_MESSAGE = 'Unknown error';
export const INTERNAL_SERVER_ERROR_MESSAGE = 'Internal Server Error';