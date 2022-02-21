import AdminPage from "../../pages/admin/AdminPage"
import ProductsPage from "../../pages/dashboard/ProductsPage"
import ProductPage from '../../pages/product/ProductPage'
import UserPage from "../../pages/user/UserPage"
import UserCartPage from "../../pages/cart/UserCartPage"
import ShopAccount from "../../pages/shop-account/ShopAccount"
import { admin_route, main_route, product_route, user_route, userCart_route, shop_route } from './_constans'

export const authRoutes = [
	{
		path: admin_route,
		Component: AdminPage
	},
	{
		path: user_route,
		Component: UserPage
	},
	{
		path: userCart_route,
		Component: UserCartPage
	},
	{
		path: shop_route,
		Component: ShopAccount
	}
]

export const publicRoutes = [
	{
		path: main_route,
		Component: ProductsPage
	},
	{
		path: product_route + '/:id',
		Component: ProductPage
	}
]