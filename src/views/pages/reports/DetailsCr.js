// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, FormControl, FormHelperText, Grid, InputLabel, OutlinedInput, Typography } from '@mui/material';

// third party 
import { Formik } from 'formik';

// project imports

// assets


// ===========================|| FIREBASE - REGISTER ||=========================== //

const DetailsCr = ({ row }) => {
  const theme = useTheme();
  console.log("valor row:" + row)
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
          admin: row.admin_id,
          name: row.collector_username,
          document: row.borrowedValue,
          address: row.safeValue,
          occupation: row.rate,
          total: row.creditDays,
          submit: null
        }}
 
      >
        {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <FormControl fullWidth error={Boolean(touched.id && errors.id)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-register">Id</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="text"
                value={values.id}
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
                readOnly
              /> 
            </FormControl>
            <FormControl fullWidth error={Boolean(touched.name && errors.name)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-register">Administrador</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="text"
                value={values.name}
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.name && errors.name)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-register">Collector </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="text"
                value={values.name}
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.document && errors.document)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-register">Cliente</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="text"
                value={values.document}
                name="document"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.document && errors.document)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-register">Valor credito</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="text"
                value={values.id}
                name="document"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.address && errors.address)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-register">Direccion</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="text"
                value={values.address}
                name="address"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
                readOnly
              />
              {touched.address && errors.address && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.address}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth error={Boolean(touched.occupation && errors.occupation)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-register">Ocupacion</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="text"
                value={values.occupation}
                name="occupation"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.occupation && errors.occupation && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.occupation}
                </FormHelperText>
              )}
            </FormControl>

            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

          </form>
        )}
      </Formik>
    </>
  );
};

export default DetailsCr;
