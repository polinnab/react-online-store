export const LOCAL_HOST = process.env.REACT_APP_LOCAL_HOST + ':'
export const PORT = process.env.REACT_APP_SERVER_PORT || 5001
export const IMAGE_URL = LOCAL_HOST + PORT + '/upload/'

export const admin_route = '/admin'
export const login_route = '/login'
export const register_route = '/registration'
export const main_route = '/'
export const product_route = '/product'
export const basket_route = '/basket'