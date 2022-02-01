import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { categoriesActions } from '../../redux-store/saga/sagaActions';
import './filterblock.scss';

const addCheckField = (count, categories) => {
  const stateCat = {};
  count.forEach((elem) => {
    const cat = categories[elem];
    const filterCat = cat.map((item) => {
      const catObj = { ...item };
      catObj.checked = false;
      return catObj;
    });
    stateCat[elem] = filterCat;
  });

	return stateCat
};

const FilterBlock = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const fetchCat = useSelector((state) => state.categories);
  const [state, setState] = useState({});
	const { brands, colors, types } = state;

  useEffect(() => {
    dispatch({ type: categoriesActions.GET_ALL_CAT });
  }, [dispatch]);

  useEffect(() => {
    const catCount = Object.keys(fetchCat);
    let catReadyCount = 0;

    for (const i in fetchCat) {
      if (fetchCat[i].length) {
        catReadyCount++;
      }
    }

    if (catCount.length === catReadyCount) {
      setState(addCheckField(catCount, fetchCat));
    }
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
