// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, FormControl, Grid, InputLabel, OutlinedInput, Typography } from '@mui/material';

// third party
import { Formik } from 'formik';

// project imports

// assets

// ===========================|| FIREBASE - REGISTER ||=========================== //

const DetailsCr = ({ row }) => {
  const theme = useTheme();
  console.log('valor row:' + row);
  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Detalles del credito </Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          id: row.id,
          nameCollector: row.collector_username,
          nameCliente: row.client_name,
          borrowedValue: row.borrowedValue,
          safeValue: row.safeValue,
          rate: row.rate,
          creditsDays: row.creditDays,
          collAddres: row.collectionAddress,
          initialCredit: row.creditInitDate,
          finallyCredit: row.creditFinishDate,
          pay: row.paymentInstallments,
          stat: row.status,
          creado: row.created_at
        }}
      >
        {({ values }) => (
          <form>
            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
              <InputLabel>Id Credito </InputLabel>
              <OutlinedInput type="text" value={values.id} name="name" inputProps={{}} readOnly />
            </FormControl>

            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
              <InputLabel>Nombre Usuario Collector </InputLabel>
              <OutlinedInput type="text" value={values.nameCollector} name="name" inputProps={{}} readOnly />
            </FormControl>

            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
              <InputLabel>Nombre Cliente </InputLabel>
              <OutlinedInput type="text" value={values.nameCliente} name="name" inputProps={{}} readOnly />
            </FormControl>

            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
              <InputLabel>Monto Inicial </InputLabel>
              <OutlinedInput type="text" value={values.borrowedValue} name="name" inputProps={{}} readOnly />
            </FormControl>

            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
              <InputLabel>Valor Seguro </InputLabel>
              <OutlinedInput type="text" value={values.safeValue} name="name" inputProps={{}} readOnly />
            </FormControl>

            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
              <InputLabel>Tasa de Credito </InputLabel>
              <OutlinedInput type="text" value={values.rate} name="name" inputProps={{}} readOnly />
            </FormControl>

            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
              <InputLabel>Dias Credito </InputLabel>
              <OutlinedInput type="text" value={values.creditsDays} name="name" inputProps={{}} readOnly />
            </FormControl>

            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
              <InputLabel>Direccion Cliente </InputLabel>
              <OutlinedInput type="text" value={values.collAddres} name="name" inputProps={{}} readOnly />
            </FormControl>

            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
              <InputLabel>Fecha Inicio Credito  </InputLabel>
              <OutlinedInput type="text" value={values.initialCredit} name="name" inputProps={{}} readOnly />
            </FormControl>

            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
              <InputLabel>Fecha Finalizacion Credito </InputLabel>
              <OutlinedInput type="text" value={values.finallyCredit} name="name" inputProps={{}} readOnly />
            </FormControl>

            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
              <InputLabel>Cuotas Pagas</InputLabel>
              <OutlinedInput type="text" value={values.pay} name="name" inputProps={{}} readOnly />
            </FormControl>

            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
              <InputLabel>Estado del Credito</InputLabel>
              <OutlinedInput type="text" value={values.stat} name="name" inputProps={{}} readOnly />
            </FormControl>

            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
              <InputLabel>Fecha Creacion Credito </InputLabel>
              <OutlinedInput type="text" value={values.creado} name="name" inputProps={{}} readOnly />
            </FormControl>
          </form>
        )}
      </Formik>
    </>
  );
};

export default DetailsCr;
