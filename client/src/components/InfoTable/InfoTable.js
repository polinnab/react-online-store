import React from 'react';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import { DeleteOutline, EditOutlined } from '@mui/icons-material';

const InfoTable = ({ headers, body, dataType, editElem, removeElem }) => {
  const { brands, colors, types } = useSelector((state) => state.categories);
  const tableHeaderCells = headers
    ? headers.map((elem, idx) => (
        <TableCell key={idx} align={idx ? 'right' : 'left'}>
          {elem}
        </TableCell>
      ))
    : null;
  const findCat = (cat, id) => {
    if (cat.length) {
      const {name} = cat.find((elem) => (elem.id === id ? elem.name : null));
      return name;
    }
  };
  const tableBodyCells = body
    ? body.map((elem, idx) => {
        const cell = (
          <TableRow key={elem.id}>
            <TableCell align='left'>{idx + 1}</TableCell>
            {elem.name ? <TableCell align='right'>{elem.name}</TableCell> : null}
            {elem.desc ? <TableCell align='right'>{elem.desc}</TableCell> : null}
            {elem.price ? <TableCell align='right'>{elem.price}</TableCell> : null}
            {elem.images ? (
              <TableCell align='right'>
                <img src={elem.images[0].big} alt={elem.name} />
              </TableCell>
            ) : null}
            {elem.typeId ? <TableCell align='right'>{findCat(types, elem.typeId)}</TableCell> : null}
            {elem.brandId ? <TableCell align='right'>{findCat(brands, elem.brandId)}</TableCell> : null}
            {elem.colorId ? <TableCell align='right'>{findCat(colors, elem.colorId)}</TableCell> : null}
            {removeElem || editElem ? (
              <TableCell align='right' style={{ cursor: 'pointer' }}>
                {editElem ? (
                  <span onClick={() => editElem(elem.id)}>
                    <EditOutlined />
                  </span>
                ) : null}
                {removeElem ? (
                  <span onClick={() => removeElem(elem.id)}>
                    <DeleteOutline />
                  </span>
                ) : null}
              </TableCell>
            ) : null}
          </TableRow>
        );

        return cell;
      })
    : null;

  return (
    <TableContainer component={Paper} style={{ margin: '20px 0' }}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>{tableHeaderCells}</TableRow>
        </TableHead>
        <TableBody>{tableBodyCells}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default InfoTable;
