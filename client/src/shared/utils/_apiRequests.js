import axios from 'axios';
import {LOCAL_HOST, PORT} from './_constans'

export const fetchProduct = async (id) => {
  const { data } = await axios(LOCAL_HOST + PORT + '/api/product?id=' + id, {
    method: 'get',
    headers: {
			'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  return data;
};

export const uploadImage = async (images) => {
  const { data } = await axios(LOCAL_HOST + PORT + '/api/image', {
    method: 'post',
    headers: {
			'Content-Type': 'form/multipart',
    },
    data: images
  });
  return data;
}

export const productFilter = async (opt) => {
  const { data } = await axios(LOCAL_HOST + PORT + '/api/filter?' + opt, {
    method: 'get',
    headers: {
			'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  return data;
}