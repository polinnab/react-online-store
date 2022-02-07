import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { categoriesActions } from '../../redux-store/saga/sagaActions';
import './filterblock.scss';

const addCheckField = (categories) => {
  const stateCat = {};
  for (const key in categories) {
    const cat = categories[key];
    stateCat[key] = cat.map((item) => {
      const catObj = { ...item };
      catObj.checked = false;
      return catObj;
    });
  }

  return stateCat;
};

const filterProducts = (categories) => {
  let search = '';

  for (const key in categories) {
    const cat = categories[key];
    const catVal = cat
      .filter((item) => item.checked === true)
      .map((item) => item.id)
      .join(',');
    if (catVal) {
      search +=
        key +
        '=' +
        cat
          .filter((item) => item.checked === true)
          .map((item) => item.id)
          .join(',') +
        '&';
    }
  }
};

const FilterBlock = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchCat = useSelector((state) => state.categories);
  const [state, setState] = useState({});
  const { brands, colors, types } = state;

  useEffect(() => {
    dispatch({ type: categoriesActions.GET_ALL_CAT });
  }, [dispatch]);

  useEffect(() => {
    setState(addCheckField(fetchCat));
  }, [fetchCat]);


  const handleChange = (event, cat) => {
    const catName = event.target.name;
    const checked = state[cat].map((elem) => {
      if (elem.name === catName) {
        elem.checked = event.target.checked;
      }

      return elem;
    });

    setState({
      ...state,
      [cat]: checked,
    });

    navigate({search: filterProducts(state)})
  };

  return (
    <div className='filter-block'>
      {brands?.length ? (
        <div className='filter-block__item'>
          <FormGroup>
            {brands.map((elem, idx) => {
              return <FormControlLabel key={idx} control={<Checkbox checked={elem.checked} onChange={(e) => handleChange(e, 'brands')} name={elem.name} />} label={elem.name} />;
            })}
          </FormGroup>
        </div>
      ) : null}

      {types?.length ? (
        <div className='filter-block__item'>
          <FormGroup>
            {types.map((elem, idx) => {
              return <FormControlLabel key={idx} control={<Checkbox checked={elem.checked} onChange={(e) => handleChange(e, 'types')} name={elem.name} />} label={elem.name} />;
            })}
          </FormGroup>
        </div>
      ) : null}

      {colors?.length ? (
        <div className='filter-block__item'>
          <FormGroup>
            {colors.map((elem, idx) => {
              return <FormControlLabel key={idx} control={<Checkbox checked={elem.checked} onChange={(e) => handleChange(e, 'colors')} name={elem.name} />} label={elem.name} />;
            })}
          </FormGroup>
        </div>
      ) : null}
    </div>
  );
};

export default FilterBlock;
