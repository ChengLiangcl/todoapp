import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

export default function PaginationTable({
  columns,
  rows,
  totalCount,
  fetchingFn,
  page,
}) {
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [dataRows, setDataRows] = React.useState(rows);

  React.useEffect(() => {
    setDataRows(rows);
  }, [rows]);
  console.log(page);

  const handleChangePage = (event, newPage) => {
    const actualPage = newPage + 1;
    fetchingFn(actualPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const limit = +event.target.value;
    setRowsPerPage(limit);
    // setPage(0);
    fetchingFn(page, limit);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ overflow: 'visible', maxHeight: 'none' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    fontWeight: 'bold',
                    color: '#333',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataRows.map((row, rowIndex) => (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={row.id}
                sx={{
                  backgroundColor: rowIndex % 2 === 0 ? '#fafafa' : '#fff',
                }}
              >
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.format && typeof value === 'number'
                        ? column.format(value)
                        : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={
          totalCount > 0
            ? Math.min(
                Math.max(0, page - 1),
                Math.ceil(totalCount / rowsPerPage) - 1
              )
            : 0
        }
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
