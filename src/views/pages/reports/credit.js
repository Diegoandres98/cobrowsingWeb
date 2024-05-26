// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, TextField, MenuItem, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import AuthWrapper1 from '../authentication/AuthWrapper1';
import ListCardTableWrapper from '../collector/ListCardTableWrapper';
import TableCredit from '../../components/table';
import { useEffect } from 'react';
import { useState } from 'react';
import FormDialog from '../../components/DetailsCredit';
import FormUpdateCredit from '../reports/DetailsCr';
import { listCredit } from 'services/credits.service';
import { listCollector } from 'services/collector.services';
//import AlertDialogSlide from 'views/components/AlertBorrar';
// import AuthRegister from '../authentication/auth-forms/AuthRegister';
// import AuthFooter from 'ui-component/cards/AuthFooter';

// assets

const columns = [
  { id: 'id', label: '#', minWidth: 20 },
  { id: 'client_name', label: 'Nombre', minWidth: 100 },
  { id: 'collectionAddress', label: 'Direccion', minWidth: 100 },
  { id: 'borrowedValue', label: 'Monto inicial', minWidth: 100 },
  { id: 'creditDays', label: 'Cuotas Pagas', minWidth: 100 },
  { id: 'creditFinishDate', label: 'Fecha Finalizacion Credito', minWidth: 100 },
  { id: 'paymentInstallments', label: 'Cuotas Atrazadas', minWidth: 100 },

  {
    id: 'status',
    label: 'Estado',
    minWidth: 50,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'detailsIcon',
    label: 'Detalles',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toFixed(1)
  }
];

// ===============================|| AUTH3 - REGISTER ||=============================== //

const ListCredit = () => {
  const [value, setValue] = useState(null);
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [itemList, setItemList] = useState({
    page: 1,
    itemsForPage: 10
  });

  const [collector, setCollector] = useState([]);
  const [credit, setCredit] = useState([]);
 
  const [itemForPage, setItemForPage] = useState({
    itemsForPage: 10,
    page: 1,
    total: 0,
    totalPages: 0
  });

  const [openDialog, setOpenDialog] = useState({
    status: false,
    itemSelected: null,
    statusItemSelected: null
  });

  useEffect(() => {
    listCollector(1, 10000).then((r) => {
      setCollector(r.collectorss);
      setValue(r.collectorss[0].id);
    });

    if (value !== null) {
      listCredit(itemList.page, itemList.itemsForPage, value).then((r) => {
        const valAnteriorItemsForPage = itemForPage.itemsForPage;

        setItemForPage({
          itemsForPage: r.itemsForPage,
          page: r.page,
          total: r.total,
          totalPages: r.totalPages
        });
        //add nuevo consumo, a la tabla
        if (valAnteriorItemsForPage !== r.itemsForPage) {
          setCredit(r.creditssDto);
          return;
        }
        const rS = credit.concat(r.creditssDto);
        setCredit(rS);
      });
    }
  }, [itemList]);

  useEffect(() => {
    if (value !== null) {
      listCredit(itemList.page, itemList.itemsForPage, value).then((r) => {
        const valAnteriorItemsForPage = itemForPage.itemsForPage;

        setItemForPage({
          itemsForPage: r.itemsForPage,
          page: r.page,
          total: r.total,
          totalPages: r.totalPages
        });
        //add nuevo consumo, a la tabla
        if (valAnteriorItemsForPage !== r.itemsForPage) {
          setCredit(r.creditssDto);
          return;
        }

        setCredit(r.creditssDto);
      });
    }
  }, [value]);

  const controllerPagination = ({ page, rowsPerPage }) => {
    if (itemForPage.itemsForPage !== rowsPerPage) {
      setItemList({
        itemsForPage: rowsPerPage,
        page: 1
      });
    }
    if (itemList.page > page) {
      return;
    }
    setItemList({
      itemsForPage: rowsPerPage,
      page: page + 1
    });
  };

  const openModalFunc = (type, row) => {
    if (type === 'info') {
      setOpenDialog({
        ...openDialog,
        status: true,
        itemSelected: row.id,
        row
      });
    }
  };

  return (
    <AuthWrapper1>
      <Grid container justifyContent="flex-end" sx={{ minHeight: '1vh' }}>
        <Grid item xs={12}>
          <ListCardTableWrapper>
            <Grid container alignItems="left">
              <h4>Collector: </h4>
              {collector.length > 0 && (
                <TextField
                  id="standard-select-currency"
                  select
                  value={value === null ? collector[0].id : value}
                  onChange={(e) => setValue(e.target.value)}
                >
                  {collector.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.username}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            </Grid>
            <Grid container spacing={0.3} alignItems="center" justifyContent="center">
              <Grid item xs={12}>
                <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                  <Grid item>
                    <Stack alignItems="center" justifyContent="center" spacing={1}>
                      <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : 'inherit'}>
                        <h3> Lista Creditos collector </h3>
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                {credit.length > 0 && (
                  <TableCredit
                    columns={columns}
                    rows={credit}
                    itemForPage={itemForPage}
                    callback={openModalFunc}
                    controllerPagination={controllerPagination}
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Grid>
          </ListCardTableWrapper>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          {/* <AuthFooter /> */}
        </Grid>
      </Grid>
      <FormDialog open={openDialog} setOpen={setOpenDialog} handleSendData>
        <FormUpdateCredit row={openDialog.row} open={openDialog} setOpen={setOpenDialog} />
      </FormDialog>
    </AuthWrapper1>
  );
};

export default ListCredit;
