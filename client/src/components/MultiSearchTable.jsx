import React from 'react';

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
  //   TableBody
} from '@mui/material';

import { useStateContext } from '../context/SearchProvider';

import { columns, Users } from './users';

const MultiSearchTable = ({ onRequestSort }) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
  };

  const { query, page, setPage, tableRef } = useStateContext();

  const keys = ['first_name', 'last_name', 'email'];

  const search = (Users) => {
    return Users.filter((user) => keys.some((key) => user[key].toLowerCase().includes(query)));
  };

  const rowsPerPage = 10;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table ref={tableRef} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  onRequestSort={handleRequestSort}
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {search(Users)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={user.code}>
                    {columns.map((column) => {
                      const value = user[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
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
            count={Users.length}
            page={page}
            onChange={handleChangePage}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default MultiSearchTable;
