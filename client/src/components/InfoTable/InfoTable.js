import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import { DeleteOutline, EditOutlined } from '@mui/icons-material';

const InfoTable = ({ headers, body, dataType, editElem, removeElem }) => {
  return (
    <TableContainer component={Paper} style={{ margin: '20px 0' }}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            {headers
              ? headers.map((elem, idx) => (
                  <TableCell key={idx} align={idx ? 'right' : 'left'}>
                    {elem}
                  </TableCell>
                ))
              : ''}
          </TableRow>
        </TableHead>
        <TableBody>
          {body.map((elem, idx) => {
            const item = [];

            for (const i in elem) {
              if (i !== 'id' && i !== 'images') {
                item.push(<TableCell key={i} align='right'>{`${elem[i]}`}</TableCell>);
              }

              if (i === 'images') {
                item.push(
                  <TableCell key={i} align='right'>
                    <img src={elem[i][0].big} alt={elem.name} />
                  </TableCell>
                );
              }
            }

            return (
              <TableRow key={idx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component='th' scope='row'>
                  {idx + 1}
                </TableCell>
                {item}
                {removeElem || editElem ? (
                  <TableCell align='right' style={{ cursor: 'pointer' }}>
                    {editElem ? (
                      <span onClick={() => editElem(elem.id)}>
                        <EditOutlined />
                      </span>
                    ) : (
                      null
                    )}
                    {removeElem ? (
                      <span onClick={() => removeElem(elem.id)}>
                        <DeleteOutline />
                      </span>
                    ) : (
                      null
                    )}
                  </TableCell>
                ) : (
                  null
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InfoTable;
