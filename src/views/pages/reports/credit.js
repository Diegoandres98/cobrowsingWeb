// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, TextField, MenuItem, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import AuthWrapper1 from '../authentication/AuthWrapper1';
import ListCardTableWrapper from '../collector/ListCardTableWrapper';
import TableCredit from '../../components/table';
import { useEffect } from 'react';
import { useState } from 'react';
import AlertDialogSlide from '../../components/AlertBorrar';
import FormDialog from '../../components/DetailsCredit';
import FormUpdateCredit from '../reports/DetailsCr';
import { listCredit } from 'services/credits.service'; 
import { listCollector } from 'services/collector.services'
// import AuthRegister from '../authentication/auth-forms/AuthRegister';
// import AuthFooter from 'ui-component/cards/AuthFooter';

// assets

const columns = [
  { id: 'id', label: '#', minWidth: 20 },
  { id: 'client_name', label: 'Nombre', minWidth: 170 },
  { id: 'collectionAddress', label: 'Direccion', minWidth: 100 },
  { id: 'borrowedValue', label: 'Monto inicial', minWidth: 100 },
  { id: 'creditDays', label: 'Cuotas Pagas', minWidth: 170 },
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
    id: 'actions',
    label: 'Detalles',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toFixed(2)
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

  const [ collector, setCollector] = useState([])
  const [credit, setCredit] = useState([]);
  const [openModal, setOpenModal] = useState({
    status: false,
    itemSelected: null,
    statusItemSelected: null
  });

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
      setValue(r.collectorss[0].id)
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

  useEffect(()=>{
    if (value !== null) {
      listCredit(undefined, undefined,value).then((r) => {
        setCredit(r.creditssDto);
      });
    }

  },[value])

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

 /* useEffect(() => {
    listCollector(1, 10000).then((r) => {
      setCollector(r.collectorss);
      console.log('-----------'+ r.collector);
    });
  }, [itemList]);*/

  const openModalFunc = (type, row) => {
    console.log('id press' + JSON.stringify(row));
    if (type === 'add-delete') {
      setOpenModal({
        ...openModal,
        status: true,
        itemSelected: row.id,
        statusItemSelected: row.status
      });
    }
    if (type === 'edit') {
      setOpenDialog({
        ...openDialog,
        status: true,
        itemSelected: row.id,
        row
      });
    }
  };

  const handleAcept = () => {
    //aqui borro el seleccionado
    console.log('openModal.id' + openModal.itemSelected);
    setOpenModal({
      ...openModal,
      status: false
    });
    if (openModal.itemSelected === null) {
      return;
    }
  };

  return (
    <AuthWrapper1>
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '1vh' }}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
            <Grid item sx={{ m: { xs: 0, sm: 3 }, mb: 0 }}>
              <ListCardTableWrapper>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  <Grid item xs={12}>
                    <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                      <Grid item>
                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                          <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : 'inherit'}>
                            <Grid item>
                              {
                                collector.length > 0 &&
                                  <TextField id="standard-select-currency" select value={value === null ? collector[0].id : value } onChange={(e) => setValue(e.target.value)}>
                                  {collector.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                      {option.username}
                                    </MenuItem>
                                  ))}

                                </TextField>
                              }
                            </Grid>
                            Creditos collector
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
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          {/* <AuthFooter /> */}
        </Grid>
      </Grid>
      <AlertDialogSlide openModal={openModal} setOpenModal={setOpenModal} handleAcept={handleAcept} />
      <FormDialog open={openDialog} setOpen={setOpenDialog} handleSendData>
        <FormUpdateCredit row={openDialog.row} open={openDialog} setOpen={setOpenDialog} />
      </FormDialog>
    </AuthWrapper1>
  );
};

export default ListCredit;
