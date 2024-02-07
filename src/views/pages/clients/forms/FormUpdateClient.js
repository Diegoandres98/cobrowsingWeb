// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, FormControl, FormHelperText, Grid, InputLabel, OutlinedInput, Typography } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import { putClient } from 'services/client.services';
import { messageExit, messageFail } from 'utils/sweetAlert';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const FormUpdateClient = ({ row, open, setOpen }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();

  const handleSendPutClient = async (values) => {
    console.log('handleSendPutClient' + JSON.stringify(values));
    const { name, document, address, occupation } = values;
    putClient({ id: row.id, name, document, address, occupation })
      .then((result) => {
        messageExit();
        //location.reload();
        console.log('creado ', result);
      })
      .catch((error) => {
        messageFail();
        console.error('Error en el inicio de sesión: ', error.message);
      })
      .finally(() => {
        setOpen({
          ...open,
          status: false
        });
      });
  };

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Estas a punto de editar el registro de un cliente existente</Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          name: row.name,
          document: row.document,
          address: row.address,
          occupation: row.occupation,
          submit: null
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string('nombre valido').max(255).required('nombre'),
          document: Yup.string('Ponga un Documento Valido!!').max(255).required('Documento es requerido'),
          address: Yup.string('Ponga una direccion!!').max(255).required('Direccion es requerida!'),
          occupation: Yup.string('Ponga una ocupacion!!').max(255).required('Ocupacion es requerida!')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          handleSendPutClient(values);
          try {
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
            }
          } catch (err) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <FormControl fullWidth error={Boolean(touched.name && errors.name)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-register">Nombre</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="text"
                value={values.name}
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.name && errors.name && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.name}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.document && errors.document)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-register">Documento</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="text"
                value={values.document}
                name="document"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.document && errors.document && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.document}
                </FormHelperText>
              )}
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

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Editar!!
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FormUpdateClient;
