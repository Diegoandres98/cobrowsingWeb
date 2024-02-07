// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import AuthWrapper1 from '../authentication/AuthWrapper1';
import ListCardTableWrapper from '../collector/ListCardTableWrapper';
import TableClient from '../../components/table';
import { useEffect } from 'react';
import { listClient, putClientStatusInactive } from 'services/client.services';
import { useState } from 'react';
import AlertDialogSlide from '../../components/AlertBorrar';
import FormDialog from '../../components/DialogEdit';
import FormUpdateClient from '../clients/forms/FormUpdateClient';

// import AuthRegister from '../authentication/auth-forms/AuthRegister';
// import AuthFooter from 'ui-component/cards/AuthFooter';

// assets
const columns = [
  { id: 'id', label: '#', minWidth: 20 },
  { id: 'name', label: 'Nombre', minWidth: 170 },
  { id: 'document', label: 'Documento', minWidth: 100 },
  { id: 'occupation', label: 'Ocupación', minWidth: 100 },

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

// ===============================|| AUTH3 - REGISTER ||=============================== //

const ListClient = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [clients, setClients] = useState({});
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
    listClient().then((r) => {
      console.log(r);
      setClients(r.clientss);
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

    putClientStatusInactive({ id: openModal.itemSelected, status: openModal.statusItemSelected }).then(() => {
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
                            Listado de clientes
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    {clients.length > 0 && <TableClient columns={columns} rows={clients} callback={openModalFunc} />}
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
        <FormUpdateClient row={openDialog.row} open={openDialog} setOpen={setOpenDialog} />
      </FormDialog>
    </AuthWrapper1>
  );
};

export default ListClient;
