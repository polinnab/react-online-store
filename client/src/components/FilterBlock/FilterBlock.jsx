import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Checkbox, FormGroup, FormControlLabel, Button } from '@mui/material';
import { categoriesActions, productsActions } from '../../redux-store/saga/sagaActions';
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

const filterProducts = (categories, navigate, dispatch, pagination, filterQuery) => {
  let search = filterQuery || '';

  if (!search.length) {
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
  } else {
		search += '&'
	}

  navigate({ search });
  dispatch({ type: productsActions.FILTER_PRODUCT, query: search, pagination });
};

const setChecked = (params, state) => {
  const keys = Object.keys(state);
  keys.forEach((elem) => {
    const checkedVal = params.get(elem)?.split(',');

    checkedVal?.forEach((item) => {
      state[elem].forEach((filter) => {
        if (filter.id === item) {
          filter.checked = true;
        }
      });
    });
  });
};

const FilterBlock = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchCat = useSelector((state) => state.categories);
  const { page, limit } = useSelector((state) => state.products);
  const [state, setState] = useState({});
  const { brands, colors, types } = state;
  const filterQuery = new URLSearchParams(searchParams).toString();

  setChecked(searchParams, state);

  useEffect(() => {
    dispatch({ type: categoriesActions.GET_ALL_CAT });
  }, [dispatch]);

  useEffect(() => {
    setState(addCheckField(fetchCat));
  }, [fetchCat]);

  useEffect(() => {
    if (filterQuery.length) {
      filterProducts(state, navigate, dispatch, { page, limit }, filterQuery);
    }
  }, [page]);

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

    filterProducts(state, navigate, dispatch, { page, limit });
  };

  const clearFilters = () => {
    const uncheck = {};
    for (const elem in state) {
      uncheck[elem] = state[elem].map((item) => {
        const cat = { ...item };
        cat.checked = false;
        return cat;
      });
    }
    setSearchParams();
    setState(uncheck);
    filterProducts(uncheck, navigate, dispatch, { page, limit });
  };

  return (
    <div className='filter-block'>
      {brands?.length ? (
        <React.Fragment>
          <h3>Brand</h3>
          <div className='filter-block__item'>
            <FormGroup>
              {brands.map((elem, idx) => {
                return <FormControlLabel key={idx} control={<Checkbox checked={elem.checked} onChange={(e) => handleChange(e, 'brands')} name={elem.name} />} label={elem.name} />;
              })}
            </FormGroup>
          </div>
        </React.Fragment>
      ) : null}

      {types?.length ? (
        <React.Fragment>
          <h3>Type</h3>
          <div className='filter-block__item'>
            <FormGroup>
              {types.map((elem, idx) => {
                return <FormControlLabel key={idx} control={<Checkbox checked={elem.checked} onChange={(e) => handleChange(e, 'types')} name={elem.name} />} label={elem.name} />;
              })}
            </FormGroup>
          </div>
        </React.Fragment>
      ) : null}

      {colors?.length ? (
        <React.Fragment>
          <h3>Color</h3>
          <div className='filter-block__item'>
            <FormGroup>
              {colors.map((elem, idx) => {
                return <FormControlLabel key={idx} control={<Checkbox checked={elem.checked} onChange={(e) => handleChange(e, 'colors')} name={elem.name} />} label={elem.name} />;
              })}
            </FormGroup>
          </div>
        </React.Fragment>
      ) : null}
      <Button variant='contained' onClick={clearFilters}>
        Clear filters
      </Button>
    </div>
  );
};

export default FilterBlock;
