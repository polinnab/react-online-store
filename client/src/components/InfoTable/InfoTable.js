import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const InfoTable = ({ headers, body, removeElem }) => {
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
          {body.map((elem, idx) => (
            <TableRow key={idx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component='th' scope='row'>
                {idx + 1}
              </TableCell>
              <TableCell align='right'>{elem.name}</TableCell>
							{removeElem ? <TableCell align='right'> <span onClick={() => removeElem(elem.id)}>X</span></TableCell> : ''}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InfoTable;
