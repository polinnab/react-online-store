import React, {useEffect} from 'react';
import { TextField, Button, DialogActions } from '@mui/material';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { categoriesActions } from '../../../redux-store/saga/sagaActions';
import InfoTable from '../../InfoTable/InfoTable';
import * as yup from 'yup';

const validationSchema = yup.object({
  type: yup.string('Введите тип').required('Поле обязательно'),
});

const DialogType = ({ hideDialog, showNoti }) => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.categories.types)
  const headers = ['Типы', 'Название', 'Действие']

  useEffect(() => {
    dispatch({type: categoriesActions.GET_CAT, category_name: 'types'})
  }, [dispatch])

  const formik = useFormik({
    initialValues: {
      type: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, {resetForm}) => {
      dispatch({type: categoriesActions.ADD_CAT, category_name: 'types', val: values.type})
      showNoti({ type: 'success', message: 'Тип успешно добавлен!' })
      resetForm();
    },
  });

  const removeElem = (id) => {
    dispatch({type: categoriesActions.REMOVE_CAT, category_name: 'types', val: id})
  }

  return (
    <div>
      <InfoTable headers={headers} body={types} removeElem={removeElem}/>
      <p>Добавить тип</p>
      <form onSubmit={formik.handleSubmit}>
        <TextField label='Тип' variant='standard' value={formik.values.type} type='text' name='type' onChange={formik.handleChange} error={formik.touched.type && Boolean(formik.errors.type)} helperText={formik.touched.type && formik.errors.type} fullWidth />
        <DialogActions style={{ marginTop: '20px' }}>
          <Button onClick={() => hideDialog()}>Закрыть</Button>
          <Button variant='contained' type='submit'>
            Добавить тип
          </Button>
        </DialogActions>
      </form>
    </div>
  );
};

export default DialogType