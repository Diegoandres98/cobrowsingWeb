// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import AuthWrapper1 from '../authentication/AuthWrapper1';
import ListCardTableWrapper from '../collector/ListCardTableWrapper';
import TableCollector from '../../components/table';
import { useEffect } from 'react';
import { listCollector, putCollectorStatusInactive } from 'services/collector.services';
import { useState } from 'react';
import AlertDialogSlide from '../../components/AlertBorrar';
import FormDialog from '../../components/DialogEdit';
import AuthEdit from '../authentication/auth-forms/AuthEdit';

// import AuthRegister from '../authentication/auth-forms/AuthRegister';
// import AuthFooter from 'ui-component/cards/AuthFooter';

// assets
const columns = [
  { id: 'id', label: '#', minWidth: 20 },
  { id: 'name', label: 'Nombre', minWidth: 170 },
  { id: 'username', label: 'Username', minWidth: 100 },
  {
    id: 'status',
    label: 'Estado',
    minWidth: 50,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'actions',
    label: 'Operaciones',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toFixed(2)
  }
];

// function createData(name, code, population, size) {
//   const sidze = population / size;
//   return { name, code, population, status: population, actions: sidze };
// }

// const rows = [
//   createData('India', 'IN', 1324171354, 3287263),
//   createData('China', 'CN', 1403500365, 9596961),
//   createData('Italy', 'IT', 60483973, 301340),
//   createData('United States', 'US', 327167434, 9833520),
//   createData('Canada', 'CA', 37602103, 9984670),
//   createData('Australia', 'AU', 25475400, 7692024),
//   createData('Germany', 'DE', 83019200, 357578),
//   createData('Ireland', 'IE', 4857000, 70273),
//   createData('Mexico', 'MX', 126577691, 1972550),
//   createData('Japan', 'JP', 126317000, 377973),
//   createData('France', 'FR', 67022000, 640679),
//   createData('United Kingdom', 'GB', 67545757, 242495),
//   createData('Russia', 'RU', 146793744, 17098246),
//   createData('Nigeria', 'NG', 200962417, 923768),
//   createData('Brazil', 'BR', 210147125, 8515767)
// ];
// ===============================|| AUTH3 - REGISTER ||=============================== //

const ListCollector = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [collector, setCollector] = useState({});
  const [openModal, setOpenModal] = useState({
    status: false,
    itemSelected: null,
    statusItemSelected: null
  });

  const [openDialog, setOpenDialog] = useState({
    status: false,
    itemSelected: null,
    statusItemSelected: null
  });

  useEffect(() => {
    listCollector().then((r) => {
      console.log(r);
      setCollector(r.collectorss);
    });
  }, []);

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

    putCollectorStatusInactive({ id: openModal.itemSelected, status: openModal.statusItemSelected }).then(() => {
      window.location.reload();
    });
    // openModal.id;
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
                            Listado de cobradores
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    {collector.length > 0 && <TableCollector columns={columns} rows={collector} callback={openModalFunc} />}
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
        <AuthEdit row={openDialog.row} open={openDialog} setOpen={setOpenDialog} />
      </FormDialog>
    </AuthWrapper1>
  );
};

export default ListCollector;
