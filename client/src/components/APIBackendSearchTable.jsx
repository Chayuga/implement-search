import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Pagination,
  Box,
  Typography
} from '@mui/material';

import { useStateContext } from '../context/SearchProvider';

import { columns } from './users';

const APIBackendSearchTable = () => {
  const { query } = useStateContext();
  const [data, setData] = useState([]);

  const { page, setPage, rowsPerPage } = useStateContext();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(`http://localhost:3000?q=${query}`);
      setData(res.data);
    };
    fetchUsers();
  }, [query]);

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={user.code}>
                  {columns.map((column) => {
                    const value = user[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: 'Flex',
          justifyContent: 'space-between'
        }}>
        <Typography
          variant="h6"
          sx={{
            // border: '1px solid #BDBDBD',
            borderRadius: '5px',
            padding: '0rem 0.7rem',
            marginLeft: '0.7rem',
            marginBottom: '0.7rem',
            display: 'Flex',
            alignItems: 'center'
          }}>
          page : {page}
        </Typography>
        <Box
          sx={{
            display: 'Flex',
            justifyContent: 'flex-end',
            padding: '0.7rem'
          }}>
          <Pagination
            defaultPage={1}
            sx={{
              border: '1px solid #BDBDBD',
              borderRadius: '5px'
            }}
            count={data.length}
            page={page}
            onChange={handleChangePage}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default APIBackendSearchTable;
