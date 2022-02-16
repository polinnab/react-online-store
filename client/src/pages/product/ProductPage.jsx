import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import { fetchProduct } from '../../shared/utils/_apiRequests';
import { categoriesActions, cartActions } from '../../redux-store/saga/sagaActions';
import { IMAGE_URL } from '../../shared/utils/_constans';
import Button from '../../components/Button/Button';
import { dialog } from '../../redux-store/slices/dialogSlice';
import Dialogs from '../../components/Dialogs';
import 'react-image-gallery/styles/scss/image-gallery.scss'
import '../../styles/productPage.scss'


const ProductPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { brands } = useSelector((state) => state.categories);
  const [product, setProduct] = useState();
  const [isLoad, setIsLoad] = useState(true);
  const [brandName, setBrandName] = useState();
  const [gallery, setGallery] = useState();

  useEffect(() => {
    dispatch({ type: categoriesActions.GET_CAT, category_name: 'brands' });
  }, [dispatch]);

  useEffect(() => {
    fetchProduct(id).then((data) => {
      setProduct(data);
      setIsLoad(false);
    });
  }, [id]);

  useEffect(() => {
    if (brands.length && product) {
      const { name } = brands.find((elem) => (elem.id === product.brandId ? elem.name : null));
      setBrandName(name);
      setGallery(product.images.map(elem => {
        elem.original = IMAGE_URL + elem.original
        elem.thumbnail = IMAGE_URL + elem.thumbnail
        return elem
      }))
    }
  }, [brands, product]);

  const addToCart = () => {
    dispatch({ type: cartActions.ADD_TO_CART, product: product })
    dispatch(
      dialog({
        visible: true,
        name: 'addToCart',
      })
    );
  }

  return !isLoad ? (
    <div className='container product-page'>
      <div className='product-page__images'>
        <ImageGallery lazyLoad={true} showNav={false} additionalClass='product-page__gallery' showFullscreenButton={false} autoPlay={false} showPlayButton={false} items={gallery}/>
      </div>

      <div className='product-page__info'>
        <div className='product-page__brand'>{brandName}</div>
        <h2 className='product-page__name'>{product.name}</h2>
        <div className='product-page__desc'>{product.desc}</div>
        <div className='product-page__price'>{product.price}</div>
        <button className='btn btn--orange' onClick={() => addToCart()}>Buy</button>
      </div>

      <Dialogs readyData={true} />
    </div>
  ) : null;
};

export default ProductPage;
