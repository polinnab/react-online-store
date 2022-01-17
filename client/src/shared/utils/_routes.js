import AdminPage from "../../pages/admin/AdminPage"
import ProductsPage from "../../pages/dashboard/ProductsPage"
import { admin_route, main_route } from './_constans'

export const authRoutes = [
	{
		path: admin_route,
		Component: AdminPage
	}
]

export const publicRoutes = [
	{
		path: main_route,
		Component: ProductsPage
	},
	// {
	// 	path: product_route + '/:id',
	// 	Component: Product
	// }
]