import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { ActionIcon } from '../components/iconAction';
import { StatusIcon } from '../components/status';
// eslint-disable-next-line react/prop-types
export default function ColumnGroupingTable({ columns, rows, callback, itemForPage, controllerPagination }) {
  // const [rowsPage, setRowsPage] = React.useState(rows);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    controllerPagination(newPage);
    console.log('newPage ' + newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log('press handleChangeRowsPerPage ');
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    setPage(itemForPage.page - 1);
    setRowsPerPage(itemForPage.itemsForPage);
    // setRowsPage(rows);
    console.log('IMPRIENDOODOSADOASDOASODASODOA' + JSON.stringify(rows));
  }, []);

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ top: 0, minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    if (column.id === 'status') {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <StatusIcon status={row.status} />
                        </TableCell>
                      );
                    }
                    if (column.id === 'actions') {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <ActionIcon row={row} callback={callback} />
                        </TableCell>
                      );
                    }
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
      <TablePagination
        labelRowsPerPage="Filas por pagina: "
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={itemForPage.total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
