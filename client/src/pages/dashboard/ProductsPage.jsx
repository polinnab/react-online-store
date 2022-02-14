import FetchedProducts from '../../components/products/FetchedProducts';
import FilterBlock from '../../components/FilterBlock/FilterBlock';
import { Grid } from '@mui/material';

const ProductsPage = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={3}>
        <FilterBlock />
      </Grid>

      <Grid item xs={12} sm={9}>
        <FetchedProducts />
      </Grid>
    </Grid>
  );
};

export default ProductsPage;
