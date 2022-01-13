import { Route, BrowserRouter, Routes } from "react-router-dom"
import { ROUTES } from "./shared/utils/_routes"
import ProductsPage from "./pages/dashboard/ProductsPage";
import AdminPage from "./pages/admin/AdminPage";


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} exact element={<ProductsPage />} />
        <Route path={ROUTES.admin} element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
