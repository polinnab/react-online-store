import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { ROUTES } from './shared/utils/_routes';
import ProductsPage from './pages/dashboard/ProductsPage';
import AdminPage from './pages/admin/AdminPage';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={'/'} exact element={<ProductsPage />} />
          <Route path={ROUTES.admin} element={<AdminPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
