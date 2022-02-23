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

const userActions = {
  GET_USER: "GET_USER",
  EDIT_USER: "EDIT_USER",
  GET_ALL_SOC: "GET_ALL_SOC"
}

const orderActions = {
  GET_ORDERS: "GET_ORDERS",
  EDIT_ORDER: "EDIT_ORDER"
}

export {
  categoriesActions,
  productsActions,
  cartActions,
  userActions,
  orderActions
}