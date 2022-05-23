const categoriesActions = {
  ADD_CAT: "ADD_CAT",
  GET_CAT: "GET_CAT",
  GET_ALL_CAT: "GET_ALL_CAT",
  REMOVE_CAT: "REMOVE_CAT"
};

const productsActions = {
  GET_ALL_PRODUCTS: "GET_ALL_PRODUCTS",
  GET_PRODUCT: "GET_PRODUCT",
  ADD_PRODUCT: "ADD_PRODUCT",
  EDIT_PRODUCT: "EDIT_PRODUCT",
  REMOVE_PRODUCT: "REMOVE_PRODUCT",
  FILTER_PRODUCT: "FILTER_PRODUCT"
}

const cartActions = {
  ADD_TO_CART: "ADD_TO_CAR",
  GET_CART: "GET_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  EMPTY_CART: "EMPTY_CART",
  CHANGE_COUNT: "CHANGE_COUNT"
}

const orderActions = {
  GET_ORDERS: "GET_ORDERS",
  EDIT_ORDER: "EDIT_ORDER"
}

const loginActions = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  REGISTRATION: "REGISTRATION",
  CHECK_AUTH: "CHECK_AUTH",
  EDIT_USER: "EDIT_USER"
}

export {
  categoriesActions,
  productsActions,
  cartActions,
  orderActions,
  loginActions
}