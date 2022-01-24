import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { productsActions } from '../../redux-store/saga/sagaActions';
import { basket_route } from '../../shared/utils/_constans';
import ImageGallery from 'react-image-gallery';

const ProductPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [images, setImages] = useState([])
  const { product } = useSelector((state) => state.products);

  useEffect(() => {
    if (!product.name) {
      dispatch({ type: productsActions.GET_PRODUCT, id });
      // setImages(product.images)
    }
  });
  

  console.log('product', { ...product });
  console.log('images', images);
  return (
    <div className='container'>
      <h2>{product.name}</h2>
      <div className='product-page__gallery'>
        {<ImageGallery items={images}/>}
        {/* {product.images?.map((elem, idx) => (
          <img src={'http://localhost:5001/upload/' + elem.original} key={idx} alt={product.name} />
        ))} */}
      </div>
      <NavLink to={basket_route}>Buy</NavLink>
    </div>
  );
};

export default ProductPage;
