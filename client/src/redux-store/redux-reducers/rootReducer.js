import { combineReducers } from "redux";
import { productsReducer } from "./productsReducer";

export const rootReduser = combineReducers({
    products: productsReducer
})