export const GET_PRODUCTS = 'GET_PRODUCTS';


export const getProductsAction = (payload) => {
    return {
      type: GET_PRODUCTS,
      payload,
    };
};