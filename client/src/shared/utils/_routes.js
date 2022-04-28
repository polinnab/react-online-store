import AdminPage from "../../pages/admin/AdminPage"
import ProductsPage from "../../pages/dashboard/ProductsPage"
import ProductPage from '../../pages/product/ProductPage'
import UserPage from "../../pages/user/UserPage"
import CartPage from "../../pages/cart/CartPage"
import ShopAccount from "../../pages/shop-account/ShopAccount"
import { admin_route, main_route, product_route, user_route, cart_route, shop_route, login_route } from './_constans'
import LoginPage from "../../pages/login/LoginPage"

export const authRoutes = [
	{
		path: admin_route,
		Component: AdminPage,
		exact: true
	},
	{
		path: user_route,
		Component: UserPage,
		exact: true
	},
	{
		path: shop_route,
		Component: ShopAccount,
		exact: true
	}
]

export const publicRoutes = [
	{
		path: main_route,
		Component: ProductsPage,
		exact: true
	},
	{
		path: product_route + '/:id',
		Component: ProductPage,
		exact: true
	},
	{
		path: login_route,
		Component: LoginPage,
		exact: true
	},
	{
		path: cart_route,
		Component: CartPage,
		exact: true

	},
]