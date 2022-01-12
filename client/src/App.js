import FetchedProducts from "./components/products/FetchedProducts";
import ProductForm from "./components/products/ProductForm";


function App({store}) {


  return (
    <div className="container pt-3">
      <div className="row">
        <div className="col">
          <ProductForm />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h2>Fetched Products</h2>
          <FetchedProducts />
        </div>
      </div>
    </div>
  );
}

export default App;
