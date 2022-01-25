import axios from 'axios';

export const fetchProduct = async (id) => {
  const { data } = await axios('http://localhost:5001/api/product?id=' + id, {
    method: 'get',
    headers: {
			'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  return data;
};
